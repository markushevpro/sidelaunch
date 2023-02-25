import { Button, Input, Spin } from 'antd'
import { observer }            from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useParams }           from 'react-router-dom'

import { TItem }               from 'models'
import store, { StoreActions } from 'store'

import styles from './rename.module.scss'

const
    RenameDialog = observer(() => {
        const
            { loaded } = store,
            { id, action } = useParams(),
            [ item, $item ] = useState<TItem | null>( null ),
            [ value, $value ] = useState( '' ),

            save = async () => {
                if ( item ) {
                    await StoreActions.rename( item, value )
                    window.backend.ui.reload()
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

                $item( item )
                $value( item.name )
                document.title = `Rename "${item.name}"`
            }
        }, [ loaded ])

        return (

            <div className="app dialog">
                {
                    item
                        ? (
                            <div className={styles.wrap}>
                                <label>
                                    <span>Enter title</span>
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
