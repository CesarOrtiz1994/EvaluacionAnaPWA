const db = PouchDB('notas');

function guardarNota(nota) {
    nota._id = new Date().toISOString();
    return db.put(nota).then(()=> {
        self.registration.sync.register('nuevo-post');
        const newResp = {ok:true,offline:true};
        return new Response(JSON.stringify(newResp));
    });
}

function postearNotas() {
    const posteos = [];
    // console.log('entra a postear notas')
    return db.allDocs({include_docs:true}).then(docs => {
        // console.log('existen docs');
        docs.rows.forEach(row => {
            const doc = row.doc;
            // console.log('doc: ', doc);
            const data = {
                title: doc.title,
                text: doc.text,
            }

            const fetchProm = fetch('http://localhost:3001/api/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(resp => {
                // console.log('borra el doc de indexDB')
                console.log('resp ', resp.json())
                return db.remove(doc);
            });
            posteos.push(fetchProm);
        })
        return Promise.all(posteos);
    });
}