export function handleImgError(this: HTMLImageElement): void {
    this.src = 'image-placeholder.png'
}
export function handleAvatarImgError(this: HTMLImageElement): void {
    this.src = 'avatar-placeholder.png'
}

export const errorResponse = (error: any) => {
    let { status, data } = error.response

    switch (status) {
        case 500:
            // "Wookiee's fault!"
            console.log(data.message)
            break

        case 404:
            typeof window != 'undefined' && (window.location.search = '')
            break

        default:
            console.log('-error-', error)
            break
    }
}
