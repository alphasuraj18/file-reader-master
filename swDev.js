export default function swDev() {
    let swURL = `${process.env.PUBLIC_URL}/serviceWorker.js`
    navigator.serviceWorker.register(swURL).then(response => 
        console.log("Service Worker : ",response)
    )
}