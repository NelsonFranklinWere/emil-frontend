import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'emilAiSecretKeyForJWTGeneration2024SecureAndLongEnoughForProductionUseWith256Bits');

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  try {
    // Get JWT token from cookies or Authorization header
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
    }

    // Verify JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Check if user has ADMIN role
    if (payload.role !== 'ADMIN') {
      // Log unauthorized access attempt
      console.log(`Unauthorized access attempt to admin panel from IP: ${request.ip}, User: ${payload.email}`);
      
      return NextResponse.redirect(new URL('/403', request.url));
    }

    // Check IP whitelist if configured
    const allowedIps = process.env.ALLOWED_ADMIN_IPS?.split(',') || [];
    if (allowedIps.length > 0 && !allowedIps.includes('*')) {
      const clientIp = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       request.ip;
      
      if (!allowedIps.includes(clientIp)) {
        console.log(`Blocked admin access from non-whitelisted IP: ${clientIp}`);
        return NextResponse.redirect(new URL('/403', request.url));
      }
    }

    // Add admin context to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-admin-user-id', payload.sub);
    requestHeaders.set('x-admin-email', payload.email);
    requestHeaders.set('x-admin-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error('Admin middleware error:', error);
    return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/control/:path*'
  ]
};
