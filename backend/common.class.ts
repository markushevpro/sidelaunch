import DB from './db.class'

export default class CommonClass extends DB {
    _updateCallbacks: { (): void }[] = []

    onUpdate = ( cb: () => void ) => {
        !this._updateCallbacks.includes( cb ) && this._updateCallbacks.push( cb )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    withUpdateNotify = ( value: any ) => {
        setTimeout( this.runUpdate, 0 )
        return value
    }

    runUpdate = () => this._updateCallbacks.forEach( cb => cb())
}
