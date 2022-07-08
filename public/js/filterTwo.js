const filter = document.querySelector('#filterTwo');

const request = (obj) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(obj.method, obj.url, true);
        xhr.send();

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        });
    });
};

function carregarResultado(response) {
    const result = document.querySelector('#result');
    result.innerHTML = response;
}

async function carregarPagina(type, text) {
    const objConfig = {
        method: 'GET',
        url: `/filterTwo/${type}/${text}`
    }

    try {
        const response = await request(objConfig);
        carregarResultado(response);        
    } catch(error) {
        console.log(error);
    }
}



filter.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = document.querySelector('#text');
    const type = document.querySelector('#type');

    if (text.value === '') {

        carregarPagina(type.value, 0);

    } else {

        carregarPagina(type.value, text.value);

    }
});

