export function openUrl(event: any, url: string) {
    event.preventDefault();
    window.open(url, '_blank');
}

export function openFacebook(event: any) {
    openUrl(event, "https://www.facebook.com/");
}

export function openGoogle(event: any) {
    openUrl(event, "https://www.google.com/");
}