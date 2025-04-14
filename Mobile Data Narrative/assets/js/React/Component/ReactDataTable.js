//anonymous function below, avoids polluting global namespace
(() => {
    //This is the code for a new <Filters /> HTML element
    const Filters = (props) => {
        let updatePlatform = (clickEvent) => {
            props.updateFormState({
                platform: clickEvent.target.value,
            });
        }

        let updateCondition = (clickEvent) => {
            props.updateFormState({
                condition: clickEvent.target.value,
            });
        }

        let updateYear = (clickEvent) =>{
            props.updateFormState({
                year: Number(clickEvent.target.value), //make sure the options are read as numbers, that way it can find the corresponding value in data table
            });
        }

        let updatePlayed = (clickEvent) => {
            props.updateFormState({
                played: clickEvent.target.checked,
            });
        }
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-2 rightAlign'>
                            <b>Platform?</b>
                        </div>
                        <div className='col-md-1'>
                            <select
                                onChange={updatePlatform} //could have <input type ='check' onChange{update...}> for true/false checkbox
                            >
                                <option></option>
                                <option>PS1</option>
                                <option>PS2</option>
                                <option>PS3</option>
                                <option>PS4</option>
                                <option>PS5</option>
                                <option>Xbox</option>
                                <option>Xbox 360</option>
                                <option>Gamecube</option>
                                <option>Wii</option>
                                <option>Switch</option>
                                <option>DS</option>
                                <option>3DS</option>
                                <option>Gameboy</option>
                            </select>
                        </div>
                        <div className='col-md-2 rightAlign'>
                            <b>Condition?</b>
                        </div>
                        <div className='col-md-1'>
                            <select
                                onChange={updateCondition}
                            >
                                <option></option>
                                <option>Loose</option>
                                <option>No Manual</option>
                                <option>CIB</option>
                                <option>New</option>
                            </select>
                        </div>
                        <div className='col-md-2 rightAlign'>
                            <b>Release Year?</b>
                        </div>
                        <div className='col-md-1'>
                            <select
                                onChange={updateYear}
                            >
                                <option></option>
                                <option>1989</option>
                                <option>1990</option>
                                <option>1992</option>
                                <option>1995</option>
                                <option>1996</option>
                                <option>1997</option>
                                <option>1998</option>
                                <option>1999</option>
                                <option>2000</option>
                                <option>2001</option>
                                <option>2002</option>
                                <option>2003</option>
                                <option>2004</option>
                                <option>2005</option>
                                <option>2006</option>
                                <option>2007</option>
                                <option>2008</option>
                                <option>2009</option>
                                <option>2010</option>
                                <option>2011</option>
                                <option>2012</option>
                                <option>2013</option>
                                <option>2014</option>
                                <option>2015</option>
                                <option>2016</option>
                                <option>2017</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                            </select>
                        </div> <div className='col-md-2 rightAlign'>
                            <b>Unplayed?</b>
                        </div>
                        <div className='col-md-1'>
                            <input
                                type = 'checkbox'
                                onChange={updatePlayed}
                            >
                            </input>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    //This is the code for a new <DataTable /> HTML element
    const DataTable = (props) => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Games Physically Owned</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div id="gamesTable" className="col-md-8 table-responsive"><table className="text-center table">
                        <tbody><tr>
                            <th>Title</th>
                            <th>Platform</th>
                            <th>Year Released</th>
                            <th>Current Avg. Price</th>
                            <th>Condition</th>
                            <th>Played?</th>
                        </tr>
                            {props.dataToDisplay.map((row, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{row.title}</td>
                                        <td>{row.platform}</td>
                                        <td>{row.year}</td>
                                        <td>${row.currentAvgPrice}</td>
                                        <td>{row.condition}</td>
                                        <td>{row.played ? 'No' : 'Yes'}</td>
                                    </tr>
                                );
                            })}</tbody></table></div>
                    <div className="col-md-2"></div>
                </div>

            </div>)
    }

    class ReactDataTable extends React.Component {
        constructor(props) {
            //This calls the parent constructor method
            super(props);
            this.originalData = props.originalData;

            this.state = {
                platform: '',
                condition: '',
                year:0,
                played: false,
                //if int =>> year:null, OR year:0,
                //can also check true or false =>> isOnlyFeeding:false,
            };

            this.updateFormState = this.updateFormState.bind(this);
        }

        updateFormState(specification) {
            this.setState(specification);
        }

        render() {
            let filteredData = this.originalData;

            if (this.state.platform !== '') {
                filteredData = filteredData.filter(
                    (row) => row.platform === this.state.platform
                );
            }            
            
            if (this.state.condition !== '') {
                filteredData = filteredData.filter(
                    (row) => row.condition === this.state.condition
                );
            }

            if(this.state.year !== 0) {
                filteredData = filteredData.filter(
                    (row) => row.year === this.state.year
                );
            }

            if(this.state.played !== false) {
                filteredData = filteredData.filter(
                    (row) => row.played === this.state.played
                )
            }
            


            return (
                <React.Fragment>
                    <Filters
                        updateFormState={this.updateFormState}
                    />

                    <hr />

                    <DataTable
                        dataToDisplay={filteredData}
                    />
                </React.Fragment>
            );
        }
    }
    const tableData = [
        {
            title: "Halo 2",
            platform: "Xbox",
            year: 2004,
            currentAvgPrice: 15.18,
            condition: "CIB",
            played: false
        },
        {
            title: "Guilty Gear X2 Reload",
            platform: "Xbox",
            year: 2004,
            currentAvgPrice: 9.63,
            condition: "No Manual",
            played: true
        },
        {
            title: "Sega GT & JSRF",
            platform: "Xbox",
            year: 2002,
            currentAvgPrice: 9.99,
            condition: "CIB",
            played: true
        },
        {
            title: "Beautiful Katamari",
            platform: "Xbox 360",
            year: 2007,
            currentAvgPrice: 19.97,
            condition: "CIB",
            played: false
        },
        {
            title: "Halo 3",
            platform: "Xbox 360",
            year: 2007,
            currentAvgPrice: 8,
            condition: "CIB",
            played: false
        },
        {
            title: "Portal 2 [Platinum Hits]",
            platform: "Xbox 360",
            year: 2011,
            currentAvgPrice: 7,
            condition: "CIB",
            played: true
        },
        {
            title: "Ty the Tasmanian Tiger 3: Night of the Quinkan",
            platform: "Gamecube",
            year: 2005,
            currentAvgPrice: 23.29,
            condition: "No Manual",
            played: false
        },
        {
            title: "Club Penguin: Gameday",
            platform: "Wii",
            year: 2010,
            currentAvgPrice: 7.21,
            condition: "CIB",
            played: true
        },
        {
            title: "Donkey Kong Country Returns",
            platform: "Wii",
            year: 2010,
            currentAvgPrice: 12.95,
            condition: "CIB",
            played: true
        },
        {
            title: "Hasbro Family Game Night 3",
            platform: "Wii",
            year: 2010,
            currentAvgPrice: 13.79,
            condition: "CIB",
            played: true
        },
        {
            title: "Just Dance",
            platform: "Wii",
            year: 2009,
            currentAvgPrice: 5.98,
            condition: "No Manual",
            played: true
        },
        {
            title: "Just Dance 3",
            platform: "Wii",
            year: 2011,
            currentAvgPrice: 7.14,
            condition: "CIB",
            played: true
        },
        {
            title: "Mario Kart Wii",
            platform: "Wii",
            year: 2008,
            currentAvgPrice: 28.40,
            condition: "No Manual",
            played: true
        },
        {
            title: "Rayman Origins",
            platform: "Wii",
            year: 2011,
            currentAvgPrice: 11.00,
            condition: "CIB",
            played: true
        },
        {
            title: "The Smurfs: Dance Party",
            platform: "Wii",
            year: 2011,
            currentAvgPrice: 5.74,
            condition: "CIB",
            played: true
        },
        {
            title: "Sonic and the Black Knight",
            platform: "Wii",
            year: 2009,
            currentAvgPrice: 15.56,
            condition: "CIB",
            played: true
        },
        {
            title: "Sonic Colors",
            platform: "Wii",
            year: 2010,
            currentAvgPrice: 11.34,
            condition: "CIB",
            played: true
        },
        {
            title: "Sonic and the Secret Rings",
            platform: "Wii",
            year: 2007,
            currentAvgPrice: 8.22,
            condition: "CIB",
            played: false
        },
        {
            title: "Sonic Unleashed",
            platform: "Wii",
            year: 2008,
            currentAvgPrice: 9.99,
            condition: "Loose",
            played: true
        },
        {
            title: "Star Wars: The Force Unleashed",
            platform: "Wii",
            year: 2008,
            currentAvgPrice: 4.98,
            condition: "CIB",
            played: true
        },
        {
            title: "Star Wars: The Force Unleashed II",
            platform: "Wii",
            year: 2010,
            currentAvgPrice: 5.66,
            condition: "CIB",
            played: true
        },
        {
            title: "Super Mario All Stars [Limited Edition]",
            platform: "Wii",
            year: 2010,
            currentAvgPrice: 30.03,
            condition: "CIB",
            played: true
        },
        {
            title: "Super Mario Galaxy",
            platform: "Wii",
            year: 2007,
            currentAvgPrice: 13.95,
            condition: "CIB",
            played: true
        },
        {
            title: "The Legend of Zelda: Twilight Princess",
            platform: "Wii",
            year: 2006,
            currentAvgPrice: 18.77,
            condition: "CIB",
            played: true
        },
        {
            title: "The Legend of Zelda: Skyward Sword",
            platform: "Wii",
            year: 2011,
            currentAvgPrice: 17.85,
            condition: "CIB",
            played: true
        },
        {
            title: "Link's Crossbow Training",
            platform: "Wii",
            year: 2007,
            currentAvgPrice: 16.49,
            condition: "Loose",
            played: true
        },
        {
            title: "Wii Sports",
            platform: "Wii",
            year: 2006,
            currentAvgPrice: 22.77,
            condition: "CIB",
            played: true
        },
        {
            title: "Wii Sports Resort",
            platform: "Wii",
            year: 2009,
            currentAvgPrice: 25.00,
            condition: "No Manual",
            played: true
        },
        {
            title: "Chicken Blaster",
            platform: "Wii",
            year: 2009,
            currentAvgPrice: 14.18,
            condition: "Loose",
            played: true
        },
        {
            title: "Animal Crossing: New Horizons",
            platform: "Switch",
            year: 2020,
            currentAvgPrice: 34.98,
            condition: "CIB",
            played: true
        },
        {
            title: "Monster Hunter Rise",
            platform: "Switch",
            year: 2021,
            currentAvgPrice: 13.75,
            condition: "CIB",
            played: true
        },
        {
            title: "Pokemon Legends: Arceus",
            platform: "Switch",
            year: 2022,
            currentAvgPrice: 38.62,
            condition: "CIB",
            played: true
        },
        {
            title: "Pokemon Violet",
            platform: "Switch",
            year: 2022,
            currentAvgPrice: 37.95,
            condition: "CIB",
            played: true
        },
        {
            title: "Super Mario Odyssey",
            platform: "Switch",
            year: 2017,
            currentAvgPrice: 31.74,
            condition: "CIB",
            played: true
        },
        {
            title: "Super Monkey Ball Banana Mania [Anniversary Edition]",
            platform: "Switch",
            year: 2021,
            currentAvgPrice: 14.02,
            condition: "CIB",
            played: true
        },
        {
            title: "Super Smash Bros. Ultimate",
            platform: "Switch",
            year: 2018,
            currentAvgPrice: 35.36,
            condition: "CIB",
            played: true
        },
        {
            title: "We Love Katamari Reroll + Royal Reverie",
            platform: "Switch",
            year: 2023,
            currentAvgPrice: 22.92,
            condition: "CIB",
            played: true
        },
        {
            title: "The Legend of Zelda: Breath of the Wild",
            platform: "Switch",
            year: 2017,
            currentAvgPrice: 29.99,
            condition: "CIB",
            played: true
        },
        {
            title: "The Legend of Zelda: Tears of the Kingdom",
            platform: "Switch",
            year: 2023,
            currentAvgPrice: 40.53,
            condition: "CIB",
            played: true
        },
        {
            title: "Ape Escape",
            platform: "PS1",
            year: 1999,
            currentAvgPrice: 48.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Crash Bandicoot: Warped",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 15.50,
            condition: "CIB",
            played: false
        },
        {
            title: "Final Fantasy VII",
            platform: "PS1",
            year: 1997,
            currentAvgPrice: 33.41,
            condition: "No Manual",
            played: true
        },
        {
            title: "Final Fantasy IX",
            platform: "PS1",
            year: 2000,
            currentAvgPrice: 22.18,
            condition: "CIB",
            played: false
        },
        {
            title: "Metal Gear Solid",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 45.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Silent Hill [Greatest Hits]",
            platform: "PS1",
            year: 1999,
            currentAvgPrice: 174.25,
            condition: "CIB",
            played: true
        },
        {
            title: "Spyro: Year of the Dragon",
            platform: "PS1",
            year: 2000,
            currentAvgPrice: 9.48,
            condition: "Loose",
            played: false
        },
        {
            title: "Spyro: Ripto's Rage",
            platform: "PS1",
            year: 1999,
            currentAvgPrice: 8.99,
            condition: "Loose",
            played: false
        },
        {
            title: "Spyro the Dragon",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 11.73,
            condition: "Loose",
            played: true
        },
        {
            title: "MDK",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 10.00,
            condition: "Loose",
            played: true
        },
        {
            title: "Driver",
            platform: "PS1",
            year: 1999,
            currentAvgPrice: 7.19,
            condition: "Loose",
            played: true
        },
        {
            title: "Ape Escape 3",
            platform: "PS2",
            year: 2006,
            currentAvgPrice: 50.91,
            condition: "CIB",
            played: true
        },
        {
            title: "Crash: The Wrath of Cortex",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 10.26,
            condition: "No Manual",
            played: true
        },
        {
            title: "Crazy Frog Arcade Racer",
            platform: "PS2",
            year: 2007,
            currentAvgPrice: 10.54,
            condition: "No Manual",
            played: true
        },
        {
            title: "Devil May Cry",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 9.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Devil May Cry 2",
            platform: "PS2",
            year: 2003,
            currentAvgPrice: 9.94,
            condition: "CIB",
            played: false
        },
        {
            title: "Evergrace",
            platform: "PS2",
            year: 2000,
            currentAvgPrice: 19.29,
            condition: "No Manual",
            played: false
        },
        {
            title: "Katamari Damacy",
            platform: "PS2",
            year: 2004,
            currentAvgPrice: 13.74,
            condition: "CIB",
            played: true
        },
        {
            title: "Metal Gear Solid 2",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 10.59,
            condition: "CIB",
            played: true
        },
        {
            title: "Ratch & Clank",
            platform: "PS2",
            year: 2002,
            currentAvgPrice: 11.17,
            condition: "No Manual",
            played: true
        },
        {
            title: "Ratchet: Deadlocked",
            platform: "PS2",
            year: 2005,
            currentAvgPrice: 12.40,
            condition: "CIB",
            played: false
        },
        {
            title: "Silent Hill 2",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 151.11,
            condition: "CIB",
            played: true
        },
        {
            title: "Marvel Super Hero Squad",
            platform: "PS2",
            year: 2009,
            currentAvgPrice: 6.60,
            condition: "CIB",
            played: true
        },
        {
            title: "Ty The Tasmanian Tiger",
            platform: "PS2",
            year: 2002,
            currentAvgPrice: 6.97,
            condition: "CIB",
            played: true
        },
        {
            title: "Ty the Tasmanian Tiger 2: Bush Rescue",
            platform: "PS2",
            year: 2004,
            currentAvgPrice: 9.71,
            condition: "CIB",
            played: true
        },
        {
            title: "Veggie Tales: Larry Boy and the Bad Apple",
            platform: "PS2",
            year: 2006,
            currentAvgPrice: 9.33,
            condition: "CIB",
            played: true
        },
        {
            title: "Sonic Riders",
            platform: "PS2",
            year: 2006,
            currentAvgPrice: 12.47,
            condition: "Loose",
            played: true
        },
        {
            title: "Armored Core V",
            platform: "PS3",
            year: 2012,
            currentAvgPrice: 62.64,
            condition: "CIB",
            played: false
        },
        {
            title: "Devil May Cry 4",
            platform: "PS3",
            year: 2008,
            currentAvgPrice: 9.79,
            condition: "CIB",
            played: false
        },
        {
            title: "Final Fantasy X/X-2 HD Remaster",
            platform: "PS3",
            year: 2014,
            currentAvgPrice: 9.98,
            condition: "CIB",
            played: true
        },
        {
            title: "Final Fantasy XIII",
            platform: "PS3",
            year: 2010,
            currentAvgPrice: 9.50,
            condition: "CIB",
            played: false
        },
        {
            title: "Final Fantasy XIII-2",
            platform: "PS3",
            year: 2012,
            currentAvgPrice: 9.03,
            condition: "CIB",
            played: false
        },
        {
            title: "Jak and Daxter Collection",
            platform: "PS3",
            year: 2012,
            currentAvgPrice: 26.02,
            condition: "CIB",
            played: true
        },
        {
            title: "Kingdom Hearts HD 1.5 Remix [Greatest Hits]",
            platform: "PS3",
            year: 2013,
            currentAvgPrice: 6.05,
            condition: "CIB",
            played: true
        },
        {
            title: "Kingdom Hearts HD 2.5 Remix",
            platform: "PS3",
            year: 2014,
            currentAvgPrice: 7.52,
            condition: "CIB",
            played: true
        },
        {
            title: "Lollipop Chainsaw",
            platform: "PS3",
            year: 2012,
            currentAvgPrice: 70.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Metal Gear Solid 4: Guns of the Patriots",
            platform: "PS3",
            year: 2008,
            currentAvgPrice: 9.65,
            condition: "No Manual",
            played: false
        },
        {
            title: "PlayStation All-Stars Battle Royale",
            platform: "PS3",
            year: 2012,
            currentAvgPrice: 9.58,
            condition: "CIB",
            played: true
        },
        {
            title: "Ratchet & Clank: Into the Nexus",
            platform: "PS3",
            year: 2013,
            currentAvgPrice: 30.48,
            condition: "CIB",
            played: true
        },
        {
            title: "The Sly Collection",
            platform: "PS3",
            year: 2010,
            currentAvgPrice: 45.74,
            condition: "CIB",
            played: true
        },
        {
            title: "Sonic the Hedgehog (2006)",
            platform: "PS3",
            year: 2006,
            currentAvgPrice: 11.46,
            condition: "CIB",
            played: true
        },
        {
            title: "Wet",
            platform: "PS3",
            year: 2009,
            currentAvgPrice: 43.31,
            condition: "CIB",
            played: false
        },
        {
            title: "The Binding of Isaac: Afterbirth+",
            platform: "PS4",
            year: 2017,
            currentAvgPrice: 36.93,
            condition: "CIB",
            played: true
        },
        {
            title: "Bloodborne",
            platform: "PS4",
            year: 2015,
            currentAvgPrice: 15.99,
            condition: "CIB",
            played: true
        },
        {
            title: "Borderlands: The Handsome Collection",
            platform: "PS4",
            year: 2015,
            currentAvgPrice: 7.68,
            condition: "CIB",
            played: true
        },
        {
            title: "Borderlands 3",
            platform: "PS4",
            year: 2019,
            currentAvgPrice: 7.99,
            condition: "CIB",
            played: true
        },
        {
            title: "Final Fantasy VII Remake",
            platform: "PS4",
            year: 2020,
            currentAvgPrice: 19.75,
            condition: "CIB",
            played: true
        },
        {
            title: "Final Fantasy XV Royal Edition",
            platform: "PS4",
            year: 2018,
            currentAvgPrice: 13.74,
            condition: "CIB",
            played: true
        },
        {
            title: "God of War (2018)",
            platform: "PS4",
            year: 2018,
            currentAvgPrice: 12.31,
            condition: "CIB",
            played: true
        },
        {
            title: "Kingdom Hearts HD 2.8 Final Chapter Prologue",
            platform: "PS4",
            year: 2017,
            currentAvgPrice: 8.36,
            condition: "CIB",
            played: true
        },
        {
            title: "Kingdom Hearts III [Deluxe Edition]",
            platform: "PS4",
            year: 2019,
            currentAvgPrice: 21.65,
            condition: "CIB",
            played: true
        },
        {
            title: "The Last of Us Part II",
            platform: "PS4",
            year: 2020,
            currentAvgPrice: 17.96,
            condition: "CIB",
            played: true
        },
        {
            title: "No Man's Sky",
            platform: "PS4",
            year: 2016,
            currentAvgPrice: 13.50,
            condition: "CIB",
            played: true
        },
        {
            title: "Persona 5 Royal [Phantom Thieves Edition]",
            platform: "PS4",
            year: 2020,
            currentAvgPrice: 79.38,
            condition: "CIB",
            played: true
        },
        {
            title: "Resident Evil 2 (2019)",
            platform: "PS4",
            year: 2019,
            currentAvgPrice: 14.16,
            condition: "CIB",
            played: true
        },
        {
            title: "Shadow of the Colossus",
            platform: "PS4",
            year: 2018,
            currentAvgPrice: 20.98,
            condition: "CIB",
            played: true
        },
        {
            title: "Demon's Souls (2020)",
            platform: "PS5",
            year: 2020,
            currentAvgPrice: 29.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Final Fantasy XVI",
            platform: "PS5",
            year: 2023,
            currentAvgPrice: 23.97,
            condition: "New",
            played: false
        },
        {
            title: "Ghost of Tsushima Director's Cut",
            platform: "PS5",
            year: 2021,
            currentAvgPrice: 48.19,
            condition: "CIB",
            played: true
        },
        {
            title: "Silent Hill 2 (2024)",
            platform: "PS5",
            year: 2024,
            currentAvgPrice: 69.95,
            condition: "CIB",
            played: true
        },
        {
            title: "Cats & Dogs: The Revenge of Kitty Galore",
            platform: "DS",
            year: 2010,
            currentAvgPrice: 5.88,
            condition: "CIB",
            played: true
        },
        {
            title: "Kingdom Hearts 358/2 Days",
            platform: "DS",
            year: 2009,
            currentAvgPrice: 32.43,
            condition: "No Manual",
            played: true
        },
        {
            title: "Lego Battles: Ninjago",
            platform: "DS",
            year: 2011,
            currentAvgPrice: 6.53,
            condition: "CIB",
            played: true
        },
        {
            title: "Mario Kart DS",
            platform: "DS",
            year: 2005,
            currentAvgPrice: 17.95,
            condition: "CIB",
            played: true
        },
        {
            title: "Phineas & Ferb",
            platform: "DS",
            year: 2009,
            currentAvgPrice: 4.70,
            condition: "CIB",
            played: true
        },
        {
            title: "Scribblenauts",
            platform: "DS",
            year: 2009,
            currentAvgPrice: 4.84,
            condition: "CIB",
            played: true
        },
        {
            title: "Kung Zhu",
            platform: "DS",
            year: 2010,
            currentAvgPrice: 2.11,
            condition: "Loose",
            played: true
        },
        {
            title: "Sonic & Sega All-Stars Racing",
            platform: "DS",
            year: 2010,
            currentAvgPrice: 7.98,
            condition: "Loose",
            played: true
        },
        {
            title: "Lego Indiana Jones: The Original Adventures",
            platform: "DS",
            year: 2008,
            currentAvgPrice: 4.88,
            condition: "Loose",
            played: false
        },
        {
            title: "Pokemon Pearl",
            platform: "DS",
            year: 2007,
            currentAvgPrice: 39.24,
            condition: "Loose",
            played: true
        },
        {
            title: "Plants vs. Zombies",
            platform: "DS",
            year: 2011,
            currentAvgPrice: 12.45,
            condition: "Loose",
            played: true
        },
        {
            title: "Animal Crossing: New Leaf [Nintendo Selects]",
            platform: "3DS",
            year: 2016,
            currentAvgPrice: 15.25,
            condition: "CIB",
            played: true
        },
        {
            title: "The Legend of Zelda: Majora's Mask 3D",
            platform: "3DS",
            year: 2015,
            currentAvgPrice: 21.99,
            condition: "CIB",
            played: true
        },
        {
            title: "Tetris",
            platform: "Gameboy",
            year: 1989,
            currentAvgPrice: 12.20,
            condition: "Loose",
            played: true
        },
        {
            title: "Solar Striker",
            platform: "Gameboy",
            year: 1990,
            currentAvgPrice: 11.00,
            condition: "Loose",
            played: true
        },
        {
            title: "T2 The Arcade Game",
            platform: "Gameboy",
            year: 1992,
            currentAvgPrice: 9.15,
            condition: "Loose",
            played: true
        },
        {
            title: "Fist of the North Star",
            platform: "Gameboy",
            year: 1990,
            currentAvgPrice: 8.95,
            condition: "Loose",
            played: false
        },
        {
            title: "Arcade Classic: Asteroids & Missile Command",
            platform: "Gameboy",
            year: 1995,
            currentAvgPrice: 5.17,
            condition: "Loose",
            played: false
        },
        {
            title: "Megaman X4",
            platform: "PS1",
            year: 1997,
            currentAvgPrice: 13.44,
            condition: "Loose",
            played: false
        },
        {
            title: "NBA Shootout 98",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 5.49,
            condition: "Loose",
            played: false
        },
        {
            title: "Namco Museum Vol. 3",
            platform: "PS1",
            year: 1997,
            currentAvgPrice: 5.91,
            condition: "Loose",
            played: true
        },
        {
            title: "Test Drive: Off-Road",
            platform: "PS1",
            year: 1997,
            currentAvgPrice: 2.29,
            condition: "Loose",
            played: false
        },
        {
            title: "Spongebob Squarepants: Supersponge",
            platform: "PS1",
            year: 2001,
            currentAvgPrice: 4.99,
            condition: "Loose",
            played: true
        },
        {
            title: "Rallycross 2",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 6.77,
            condition: "Loose",
            played: false
        },
        {
            title: "Hot Shots Golf",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 8.77,
            condition: "Loose",
            played: false
        },
        {
            title: "Coolboarders 3",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 4.26,
            condition: "Loose",
            played: false
        },
        {
            title: "Atari Anniversary Edition Redux",
            platform: "PS1",
            year: 2001,
            currentAvgPrice: 2.99,
            condition: "Loose",
            played: true
        },
        {
            title: "Beyblade",
            platform: "PS1",
            year: 2002,
            currentAvgPrice: 6.70,
            condition: "CIB",
            played: false
        },
        {
            title: "Gran Turismo",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 10.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Rayman",
            platform: "PS1",
            year: 1995,
            currentAvgPrice: 14.47,
            condition: "CIB",
            played: true
        },
        {
            title: "Tekken 2",
            platform: "PS1",
            year: 1996,
            currentAvgPrice: 12.67,
            condition: "CIB",
            played: true
        },
        {
            title: "CTR Crash Team Racing [Collector's Edition]",
            platform: "PS1",
            year: 1998,
            currentAvgPrice: 11.87,
            condition: "Loose",
            played: false
        },
        {
            title: "NFL Blitz 2001",
            platform: "PS1",
            year: 2000,
            currentAvgPrice: 7.99,
            condition: "Loose",
            played: false
        },
        {
            title: "Final Fantasy X",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 9.99,
            condition: "CIB",
            played: true
        },
        {
            title: "Final Fantasy X [Greatest Hits]",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 8.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Final Fantasy X",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 6.52,
            condition: "Loose",
            played: true
        },
        {
            title: "Final Fantasy X-2",
            platform: "PS2",
            year: 2003,
            currentAvgPrice: 5.99,
            condition: "CIB",
            played: false
        },
        {
            title: "Grand Theft Auto: San Andreas",
            platform: "PS2",
            year: 2004,
            currentAvgPrice: 12.16,
            condition: "No Manual",
            played: false
        },
        {
            title: "Gun",
            platform: "PS2",
            year: 2005,
            currentAvgPrice: 8.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Gun",
            platform: "PS2",
            year: 2005,
            currentAvgPrice: 8.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Jak and Daxter: The Precursor Legacy",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 13.47,
            condition: "CIB",
            played: true
        },
        {
            title: "Jeopardy!",
            platform: "PS2",
            year: 2003,
            currentAvgPrice: 5.06,
            condition: "No Manual",
            played: false
        },
        {
            title: "Lego Batman The Videogame",
            platform: "PS2",
            year: 2008,
            currentAvgPrice: 7.98,
            condition: "No Manual",
            played: true
        },
        {
            title: "Madden 2003",
            platform: "PS2",
            year: 2002,
            currentAvgPrice: 4.84,
            condition: "No Manual",
            played: false
        },
        {
            title: "Max Payne",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 7.89,
            condition: "No Manual",
            played: false
        },
        {
            title: "Metal Gear Solid 2",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 8.80,
            condition: "No Manual",
            played: true
        },
        {
            title: "Metal Gear Solid 3",
            platform: "PS2",
            year: 2004,
            currentAvgPrice: 11.71,
            condition: "No Manual",
            played: false
        },
        {
            title: "Metal Gear Solid 3",
            platform: "PS2",
            year: 2004,
            currentAvgPrice: 11.71,
            condition: "No Manual",
            played: false
        },
        {
            title: "ESPN NBA 2Night",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 7.71,
            condition: "CIB",
            played: false
        },
        {
            title: "NCAA March Madness 2005",
            platform: "PS2",
            year: 2004,
            currentAvgPrice: 6.95,
            condition: "CIB",
            played: false
        },
        {
            title: "Spyro Enter the Dragonfly",
            platform: "PS2",
            year: 2002,
            currentAvgPrice: 11.01,
            condition: "CIB",
            played: false
        },
        {
            title: "Starsky & Hutch",
            platform: "PS2",
            year: 2003,
            currentAvgPrice: 5.20,
            condition: "No Manual",
            played: false
        },
        {
            title: "Supercar Street Challenge",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 5.95,
            condition: "CIB",
            played: false
        },
        {
            title: "Finding Nemo",
            platform: "PS2",
            year: 2003,
            currentAvgPrice: 5.10,
            condition: "CIB",
            played: false
        },
        {
            title: "Army Men: Soldiers of Misfortune",
            platform: "PS2",
            year: 2008,
            currentAvgPrice: 5.63,
            condition: "CIB",
            played: true
        },
        {
            title: "Tony Hawk's Proving Ground",
            platform: "PS2",
            year: 2007,
            currentAvgPrice: 5.99,
            condition: "Loose",
            played: false
        },
        {
            title: "NCAA Football 08",
            platform: "PS2",
            year: 2007,
            currentAvgPrice: 4.99,
            condition: "Loose",
            played: true
        },
        {
            title: "Guitar Hero III: Legends of Rock",
            platform: "PS2",
            year: 2007,
            currentAvgPrice: 5.87,
            condition: "Loose",
            played: true
        },
        {
            title: "Lego Indiana Jones: The Original Adventures",
            platform: "PS2",
            year: 2008,
            currentAvgPrice: 5.78,
            condition: "Loose",
            played: false
        },
        {
            title: "Unreal Tournament",
            platform: "PS2",
            year: 2000,
            currentAvgPrice: 9.59,
            condition: "Loose",
            played: false
        },
        {
            title: "God Of War II",
            platform: "PS2",
            year: 2007,
            currentAvgPrice: 11.54,
            condition: "Loose",
            played: false
        },
        {
            title: "Sonic Mega Collection Plus",
            platform: "PS2",
            year: 2004,
            currentAvgPrice: 5.88,
            condition: "Loose",
            played: false
        },
        {
            title: "Soulcaliber III",
            platform: "PS2",
            year: 2005,
            currentAvgPrice: 8.95,
            condition: "CIB",
            played: false
        },
        {
            title: "Silent Hill 2",
            platform: "PS2",
            year: 2001,
            currentAvgPrice: 151.11,
            condition: "CIB",
            played: true
        },
        {
            title: "Mirror's Edge",
            platform: "PS3",
            year: 2008,
            currentAvgPrice: 8.11,
            condition: "Loose",
            played: true
        },
        {
            title: "Lego Star Wars: The Force Awakens",
            platform: "PS3",
            year: 2016,
            currentAvgPrice: 10.43,
            condition: "CIB",
            played: true
        },
        {
            title: "Minecraft Playstation 3 Edition",
            platform: "PS3",
            year: 2014,
            currentAvgPrice: 11.27,
            condition: "CIB",
            played: true
        },
        {
            title: "Destiny",
            platform: "PS3",
            year: 2014,
            currentAvgPrice: 4.99,
            condition: "CIB",
            played: true
        },
        {
            title: "Destiny: The Taken King Legendary Edition",
            platform: "PS3",
            year: 2015,
            currentAvgPrice: 7.42,
            condition: "CIB",
            played: true
        },
        {
            title: "Uncharted 2: Among Thieves",
            platform: "PS3",
            year: 2009,
            currentAvgPrice: 3.67,
            condition: "Loose",
            played: true
        },
        {
            title: "Uncharted: Drake's Fortune [Not for Resale]",
            platform: "PS3",
            year: 2007,
            currentAvgPrice: 6.05,
            condition: "CIB",
            played: true
        },
        {
            title: "Kingdom Hearts 1.5 HD Remix [Limited Edition]",
            platform: "PS3",
            year: 2013,
            currentAvgPrice: 28.96,
            condition: "New",
            played: true
        },
        {
            title: "Doom (2016)",
            platform: "PS4",
            year: 2016,
            currentAvgPrice: 9.60,
            condition: "CIB",
            played: true
        },
        {
            title: "Persona 5 [Playstation Hits]",
            platform: "PS4",
            year: 2016,
            currentAvgPrice: 8.87,
            condition: "CIB",
            played: true
        },
        {
            title: "Tom Clancy's Rainbow Six: Siege [Advanced Edition]",
            platform: "PS4",
            year: 2018,
            currentAvgPrice: 14.83,
            condition: "CIB",
            played: true
        },
        {
            title: "Horizon: Zero Dawn",
            platform: "PS4",
            year: 2017,
            currentAvgPrice: 9.00,
            condition: "CIB",
            played: true
        },
        {
            title: "Rise of the Tomb Raider",
            platform: "PS4",
            year: 2016,
            currentAvgPrice: 12.09,
            condition: "Loose",
            played: true
        },
        {
            title: "Metal Gear Solid 2: Substance",
            platform: "Xbox",
            year: 2002,
            currentAvgPrice: 8.00,
            condition: "No Manual",
            played: false
        },
        {
            title: "Shenmue II",
            platform: "Xbox",
            year: 2002,
            currentAvgPrice: 10.49,
            condition: "CIB",
            played: false
        },
        {
            title: "Fable",
            platform: "Xbox",
            year: 2004,
            currentAvgPrice: 7.09,
            condition: "No Manual",
            played: false
        },
        {
            title: "Tom Clancy's Splinter Cell",
            platform: "Xbox",
            year: 2002,
            currentAvgPrice: 8.11,
            condition: "CIB",
            played: false
        },
        {
            title: "Borderlands 2",
            platform: "Xbox 360",
            year: 2012,
            currentAvgPrice: 3.96,
            condition: "Loose",
            played: true
        },
        {
            title: "Kim Possible Global Gemini",
            platform: "DS",
            year: 2007,
            currentAvgPrice: 14.22,
            condition: "CIB",
            played: false
        },
        {
            title: "Thinksmart: Kids 8+",
            platform: "DS",
            year: 2010,
            currentAvgPrice: 6.33,
            condition: "CIB",
            played: false
        },
        {
            title: "Kung Fu Panda",
            platform: "DS",
            year: 2008,
            currentAvgPrice: 7.72,
            condition: "CIB",
            played: false
        },
        {
            title: "Bee Movie Game",
            platform: "DS",
            year: 2007,
            currentAvgPrice: 7.26,
            condition: "CIB",
            played: false
        },
        {
            title: "Animal Planet: Emergency Vets",
            platform: "DS",
            year: 2009,
            currentAvgPrice: 4.88,
            condition: "CIB",
            played: false
        }
    ];

    const container = document.getElementById('react-data-table');
    const root = ReactDOM.createRoot(container);
    root.render(<ReactDataTable originalData={tableData} />);

})();

