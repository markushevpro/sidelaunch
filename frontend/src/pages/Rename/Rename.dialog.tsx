import { Button, Input, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams }           from 'react-router-dom'

import { TItem }               from 'models'
import store, { StoreActions } from 'store'

import styles from './rename.module.scss'

const
    RenameDialog = () => {
        const
            { id } = useParams(),
            [ item, $item ] = useState<TItem | null>( null ),
            [ value, $value ] = useState( 'hewheh' ),

            save = () => {
                item && StoreActions.rename( item, value )
                onClose()
            },

            onClose = () => {
                $item( null )
                window.backend.ui.hide()
            }

        useEffect(() => {
            if ( !id || id === 'loader' ) { return }

            const item: TItem = store.get( id )

            $item( item )
            $value( item.name )
            document.title = `Rename "${item.name}"`
        }, [])

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
    }

export default RenameDialog
