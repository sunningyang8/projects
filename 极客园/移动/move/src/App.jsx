import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { customHistory } from './utils'

import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import ProfileEdt from '@/pages/Profile/Edit'
import Article from './pages/Acticle'
import Search from './pages/Search'
import SearchResult from './pages/Search/SearchResult'
import Chat from './pages/Profile/Chat'
import NoMatch from './pages/NoMatch'
import { AuthRoute } from './components/AuthRoute'
import { KeepAlive } from './components/KeepAlive'
import './App.scss'

const App = () => {
  return (
    <Router history={customHistory}>
      <div className="app">
        <KeepAlive path="/home">
          <Layout />
        </KeepAlive>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/login" component={Login} />
          <Route path="/articles/:id" component={Article} />
          <Route exact path="/search" component={Search} />
          <Route path="/search/result" component={SearchResult} />
          <Route path="*" component={NoMatch}/>
          <AuthRoute path="/profile/edit">
            <ProfileEdt />
          </AuthRoute>
          <AuthRoute path="/chat">
            <Chat />
          </AuthRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App
