import { ipcMain, Menu } from 'electron'

import { TFolder, TLink } from 'models'

import Backend      from '../../../backend'
import { IorF }     from '../../../tools'
import AskDialog    from '../ask.window'
import RenameDialog from '../rename.window'

export default ( win: any ) => Menu.buildFromTemplate([
    {
        label: 'Rename',
        click: () => {
            if ( !win._item ) { return }
            RenameDialog.show( `${win.url}/rename/item/${win._item?.id}`, win.debug )
        }
    },
    {
        label: 'Change icon',
        click: () => {
            if ( !win._item ) { return }
            win.ref?.webContents.send( 'changeIcon', win._item.id )
        }
    },
    {
        id:    'changeArgs',
        label: 'Change args',
        click: () => {
            if ( !win._item ) { return }
            RenameDialog.show( `${win.url}/args/${win._item?.id}`, win.debug )
        }
    },
    {
        id:    'clearIcon',
        label: 'Clear icon',
        click: () => {
            if ( !win._item ) { return }
            Backend.Icons.remove( win._item.id )
        }
    },
    {
        id:    'filePath',
        label: 'Reveal in File Exporer',
        click: () => {
            if ( !win._item ) { return }
            Backend.FS.openPath(( win._item as TLink ).path )
        }
    },
    { type: 'separator' },
    {
        label: 'Remove',
        click: () => {
            if ( !win._item ) { return }

            IorF(
                win._item,

                () => {
                    if ( !win._item ) { return }
                    win.ref?.webContents.send( 'removeFile', win._item.id )
                },

                () => {
                    if ( !win._item ) { return }

                    if (( win._item as TFolder ).children.length > 0 ) {
                        AskDialog.show(
                            `${win.url}/ask`,
                            `You are going to remove ${win._item.name} folder. Do you want remove files inside or move it to parent folder?`,
                            {
                                'move':   'Move up',
                                'remove': 'Remove',
                            },
                            win.debug
                        )

                        ipcMain.handleOnce( 'ui.answer', ( _, result ) => {
                            if ( !win._item ) { return }

                            switch ( result ) {
                                case 'remove':
                                    win.ref?.webContents.send( 'removeFolder', {
                                        id:           win._item.id,
                                        keepChildren: false
                                    })
                                    break

                                case 'move':
                                    win.ref?.webContents.send( 'removeFolder', {
                                        id:           win._item.id,
                                        keepChildren: true
                                    })
                                    break

                                default:
                                    //Do nothing
                            }
                        })
                    } else {
                        win.ref?.webContents.send( 'removeFolder', {
                            id:           win._item.id,
                            keepChildren: false
                        })
                    }

                    /**/
                }
            )
        }
    }
])
