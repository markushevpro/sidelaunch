export const Item = { include: { parent: true } }
export const Folder = {
    include: {
        children: true,
        subdirs:  true
    }
}

export default {
    Item,
    Folder
}
