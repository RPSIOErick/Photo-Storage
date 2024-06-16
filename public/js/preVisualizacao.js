inputIMG.onchange = (evt) => 
{
    const [file] = inputIMG.files
    if (file) 
    {
        imgPreview.src = URL.createObjectURL(file)
    }
}