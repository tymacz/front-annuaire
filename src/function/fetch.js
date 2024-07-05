
export const fetchData = async (table) => {
    const response = await fetch(`http://localhost:8080/${table}/FindAll`);
    return await response.json();
};

export const createRows = async (table,body) => {
    console.log(body)
    const response = await fetch(`http://localhost:8080/${table}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

export const updateRows = async (table,site) => {
    const response = await fetch(`http://localhost:8080/${table}/update/${site.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(site),
    });
    return await response.json();
};

export const deleteRows = async (table,id) => {
    const response = await fetch(`http://localhost:8080/${table}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.text();
};

export const login = async (body) => {
    const response = await fetch(`http://localhost:8080/salaries/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                body
                ),
                });
                return await response.json();
}

export const GetId = async (body) => {
    const response = await fetch(`http://localhost:8080/salaries/GetId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                body
                ),
                });
                return await response.json();
}






