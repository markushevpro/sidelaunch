export
async function getBase64Image
( file: File ): Promise<string>
{
    return await new Promise(( resolve ) => {
        const reader = new FileReader()

        reader.onloadend = () => {
            resolve( reader.result as string )
        }

        reader.readAsDataURL( file )
    })
}
