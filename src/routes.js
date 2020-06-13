import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/login'
import Campanhas from './pages/campanhas'
import Relatorios from './pages/relatorios'
import Registros from './pages/registros'
import Navbar from './components/navbar/Navbar'
import Compartilhar from './pages/compartilhar'
import NovaCampanha from './pages/novaCampanha'
import discadorCampanha from './pages/discadorCampanha'

const Routes = () => (
    <BrowserRouter>

        <Switch>
            <Route exact path='/' component={Login} />

            <Navbar>

                <Route exact path='/campanhas' component={Campanhas} />
                <Route path='/registros' component={Registros} />
                <Route path='/relatorios' component={Relatorios} />
                <Route path='/campanhas/create' component={NovaCampanha} />
                <Route exact path='/campanhas/discador/:id' component={discadorCampanha} />
                <Route path='/compartilhar' component={Compartilhar} />
            </Navbar>
        </Switch>
    </BrowserRouter>
)

export default Routes