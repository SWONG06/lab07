export const allaccess = (req, res) => {
    res.status(200).send("Contenido público.");
};

export const userBoard = (req, res) => {
    res.status(200).send("Contenido de usuario.");
};

export const adminBoard = (req, res) => {
    res.status(200).send("Contenido de administrador.");
};

export const moderatorBoard = (req, res) => {
    res.status(200).send("Contenido de moderador.");
};


