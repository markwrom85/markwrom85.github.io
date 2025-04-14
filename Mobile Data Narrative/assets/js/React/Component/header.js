(() => {
    const Header = () => {
        return (
            <div id='header' className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br></br>
                        <h1>Mobile Data Narrative</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-2 button'>
                    <i class="fa-solid fa-house"></i>
                    <span>&nbsp;&nbsp;</span>
                    <a href='index.html'><button>Home</button></a>
                    </div>
                    <div className='col-md-2 button'>
                    <i class="fa-solid fa-cloud"></i>
                    <span>&nbsp;&nbsp;</span>
                    <a href='chart1.html'><button>Word Cloud</button></a>
                    </div>
                    <div className='col-md-2 button'>
                    <i class="fa-solid fa-arrow-trend-up"></i>
                    <span>&nbsp;&nbsp;</span>
                    <a href='scatter.html'><button>Current Prices</button></a>
                    </div>
                    <div className='col-md-2 button'>
                    <i class="fa-solid fa-fire"></i>
                    <span>&nbsp;&nbsp;</span>
                    <a href='heatmap.html'><button>Heatmap</button></a>
                    </div>
                    <div className='col-md-2 button'>
                    <i class="fa-solid fa-table"></i>
                    <span>&nbsp;&nbsp;</span>
                    <a href='react.html'><button>Data Table</button></a>
                    </div>
                    <div className='col-md-1'></div>
                </div>
                <br></br>
            </div>
        )
    }

    class ReactHeader extends React.Component {
        constructor(props) {
            //This calls the parent constructor method
            super(props);
        }
        render() {
            return (
                <React.Fragment>
                    <Header />
                </React.Fragment>
            );
        }
    }
    const container = document.getElementById('react-header');
    const root = ReactDOM.createRoot(container);
    root.render(<ReactHeader />);

})();