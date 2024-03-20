//Guardar en el cache dinamico
const actualizaCacheDinamico = (dynamicCache, req, res) => {

    if (res.ok) {
        return caches.open(dynamicCache).then(cache => {
            cache.put(req, res.clone())
            return res.clone();
        });
    } else {
        // error directo del servidor, cuando no existe en cache y tampoco hay internet
        //Si no logra obtener nada, retorna la respuesta original
        return res;
    }
}

function manejoApiNotas(cacheName, req) {

    if (req.clone().method === 'POST') {
        //ejecutar post
        if(self.registration.sync) {
            //console.log('acepta sincronización')
            return req.clone().text().then(body => {
                // console.log(body);
                const bodyObj = JSON.parse(body);
                return guardarNota(bodyObj);
            });
        } else {
            //console.log('deja pasar la solicitud, no acepta sincronos')
            return fetch(req);
        }

    } else {
        return fetch(req).then(resp => {
            if (resp.ok) {
                actualizaCacheDinamico(cacheName, req, resp.clone());
                return resp.clone();
            } else {
                return caches.match(req);
            }
        }).catch(err => {
            return caches.match(req);
        });

    }
}