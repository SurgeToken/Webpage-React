

function NavBar(){
    return (
        <div className="header-container2">
            <header className="header navbar navbar-expand-sm">
                <div className="nav-logo align-self-center">
                    <div className="navLogo">
                        <a className="navbar-brand" href="index.html">
                            <img className="logoNav1" src="assets/img/xsurgenew.png" alt="logo" />
                        </a>
                    </div>
                    
                    <div className="navSocial">
                        <a href="https://discord.gg/XSURGE">
                            Documentation
                        </a>
                        <a href="https://xsurgemerch.com/">
                            Store
                        </a>
                        <a href="https://twitter.com/XSURGEDEFI">
                            Community
                        </a>
                        <a href="https://www.reddit.com/r/XSURGE">
                            Help
                        </a>
                        <div className="dApp">
                            <a href="https://app.xsurge.net">Trade</a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default NavBar;