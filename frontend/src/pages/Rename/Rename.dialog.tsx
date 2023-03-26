import { Button, Input, Spin } from 'antd'
import { observer }            from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useParams }           from 'react-router-dom'

import { TItem, TLink }        from 'models'
import store, { StoreActions } from 'store'

import styles from './rename.module.scss'

const
    RenameDialog = observer(() => {
        const
            { loaded } = store,
            { id, action } = useParams(),
            [ item, $item ] = useState<TItem | null>( null ),
            [ value, $value ] = useState( '' ),
            [ label, $label ] = useState( '' ),

            save = async () => {
                if ( item ) {
                    switch ( action ) {
                        case 'args':
                            await StoreActions.updateArgs( item as TLink, value )
                            window.backend.ui.reload()
                            break

                        case 'rename':
                        default:
                            await StoreActions.rename( item, value )
                            window.backend.ui.reload()
                    }
                }
                onClose()
            },

            onClose = () => {
                $item( null )
                window.close()
            }

        useEffect(() => {
            if ( !id || id === 'loader' ) { return }
        }, [])

        useEffect(() => {
            if ( loaded ) {
                const
                    item: TItem = store.get( id )

                switch ( action ) {
                    case 'args':
                        $item( item )
                        $value(( item as TLink ).params )
                        $label( 'Enter cli args' )
                        document.title = `Change args for "${item.name}"`
                        break

                    case 'rename':
                    default:
                        $item( item )
                        $value( item.name )
                        $label( 'Enter title' )
                        document.title = `Rename "${item.name}"`
                }
            }
        }, [ loaded ])

        return (

            <div className="app dialog">
                {
                    item
                        ? (
                            <div className={styles.wrap}>
                                <label>
                                    <span>{ label }</span>
                                    <Input value={value} onChange={e => $value( e.target.value )} />
                                </label>
                            </div>
                        )
                        : (
                            <div className="center-container">
                                <Spin spinning size='large' />
                            </div>
                        )
                }

                <div className={styles.footer} style={{ display: item ? 'flex' : 'none' }}>

                    <Button onClick={onClose}>
                        Close
                    </Button>

                    <Button type="primary" onClick={save}>
                        Save
                    </Button>
                </div>
            </div>
        )
    })

export default RenameDialog
