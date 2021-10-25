export function notify(id: string, timeout?: number) {
    const alert = document.getElementById(id);

    if (!alert) {
        return;
    }

    if (alert.style.display === 'none') {
        alert.style.display = 'flex';
    }
    else {
        alert.style.display = 'none';
    }

    setTimeout(function(){ alert.style.display = 'none' }, timeout ? timeout : 250000)
}