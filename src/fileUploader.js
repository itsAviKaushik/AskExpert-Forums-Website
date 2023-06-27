exports.upload = async (file, path, name) => {
    try {
        let extension = file.name.split(".");
        extension = extension[extension.length - 1];

        let filename = name + "." + extension;

        let finalPath = path + "\\" + filename;

        await file.mv(finalPath);

        return {
            name: filename,
            size: file.size,
            dateUploaded: Date.now()
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}