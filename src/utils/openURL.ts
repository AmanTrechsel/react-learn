function openURL(url: string): void {
    history.pushState({}, "", url);
    location.reload();
}

export default openURL;