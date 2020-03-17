import React from "react";
import TransportList from './TransportList';


class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 7,
            currency: 'EUR'
        }
    }

    getDate = (i) => {
        var today = new Date();
        today.setDate(today.getDate() + i);

        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        return (year + '-' + month + '-' + day);
    }

    render() {

        return (
            <div>
                <section className="item-grid-row">
                    <div className="container-md container-sm-fluid">
                        <div className="row">
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>date</th>
                                            <th>transport</th>
                                            <th>departure</th>
                                            <th>arrival</th>
                                            <th>duration</th>
                                            <th>price</th>
                                        </tr>
                                    </thead>
                                    {/* {transportArr} */}
                                    <tbody>
                                        {[...Array(this.state.counter)].map((x, i) =>
                                            <TransportList
                                                key={i}
                                                loading={true}
                                                date={this.getDate(i)}
                                                currency={'EUR'} />
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Body;