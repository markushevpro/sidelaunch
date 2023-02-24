import { Button } from 'antd'

import styles from '../Rename/rename.module.scss'

const
    dangerKeys = [ 'danger', 'remove' ],
    parseButtons = ( raw: string ) => {
        const
            res: Record<string, string>[] = []

        raw.split( ';' ).forEach( pair => {
            const
                split = pair.split( ':' ),
                danger = dangerKeys.includes( split[ 0 ]),
                primary = danger

            res.push({
                key:     split[ 0 ],
                title:   split[ 1 ],
                danger:  danger.toString(),
                primary: primary.toString()
            })
        })

        return res
    },
    AskDialog = () => {
        const
            query = new URLSearchParams( window.location.search ),
            text = query.get( 'text' ),
            buttons = parseButtons( query.get( 'buttons' ) || '' ),

            response = ( key: string ) => {
                window.backend.ui.answer( key ).then(() => window.close())
            }

        return (

            <div className="app dialog">
                <div className={styles.wrap}>
                    { text }
                </div>

                <div className={styles.footer}>
                    {
                        buttons.map( btn => (
                            <Button
                                key={btn.key}
                                danger={btn.danger === 'true'}
                                type={btn.primary === 'true' ? 'primary' : 'default'}
                                onClick={() => response( btn.key )}
                            >
                                { btn.title }
                            </Button>
                        ))
                    }
                </div>
            </div>
        )
    }

export default AskDialog
