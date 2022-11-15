export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
}

export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
}