if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
}

const isOnline = () => {
    if (navigator.onLine) {
        alert('¡Estás en línea!');
    } else {
        alert('¡Estás fuera de línea!');
    }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();