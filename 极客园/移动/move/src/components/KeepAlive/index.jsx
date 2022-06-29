import { Route } from 'react-router-dom'

export const KeepAlive = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            children={props => {
                const isMatch = props.match !== null
                return (
                    <div
                        style={{
                            height: '100%',
                            display: isMatch ? 'block' : 'none'
                        }}
                    >
                        {children}
                    </div>
                )
            }}
        />
    )
}
