import qbit from '@/services/qbit'

export async function isAuthenticated() {
    const res = await qbit.login()
    return res === 'Ok.'
}
