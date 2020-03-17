import React from 'react';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            date: props.date,
            currency: props.currency,
            loading: this.props.loading,
            err: false
        }
    }

    componentDidMount() {
        var api = `http://www.virail.com/virail/v7/search/en_us?
                from=c.3173435&
                to=c.3169070&
                lang=en_us&
                dt=${this.state.date}&
                currency=${this.state.currency}&
                adult_passengers=1`;
        fetch(api)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    list: json.result,
                    loading: false
                });
            })
            .catch(function (error) {
                this.setState({
                    err: true
                });
            });
    }

    getTime = (time) => {
        let t = time.slice(-2); // gets am - pm
        let arr = time.slice(0, -2).split(":");

        if (t === "pm") {
            if (arr[0] === "12") {
                arr[0] = "0";
            } else {
                arr[0] = Number(arr[0]) + 12;
            }
        } else if (Number(arr[0]) < 10) {
            arr[0] = "0" + arr[0];
        }
        return '(' + arr[0] + ':' + arr[1] + ')';
    }

    render() {

        if (this.state.err) {
            return (
                <tr>
                    <td>
                        <div>
                            Something failed! Try again
                                {window.location.reload()}
                        </div>
                    </td>
                </tr>
            );
        } else if (this.state.loading) {
            return (
                // Loading Animation
                <tr className="loading">
                    <td>Loading <img src="./loader.gif" alt="loader" /></td>
                    <td>Loading <img src="./loader.gif" alt="loader" /></td>
                    <td>Loading <img src="./loader.gif" alt="loader" /></td>
                    <td>Loading <img src="./loader.gif" alt="loader" /></td>
                    <td>Loading <img src="./loader.gif" alt="loader" /></td>
                    <td>Loading <img src="./loader.gif" alt="loader" /></td>
                </tr>
            );
        } else {
            // list of objects in "result" object
            let result = this.state.list;

            // Remove items with null value for price
            const list = result.filter(item => item.price !== null);

            // Convert string type of price to number and remove $ symbol
            list.map((item, index) => {
                list[index].price = Number(item.price.slice(0, -2));
            });

            // Creat unique list and group by "transpot" field dynamically
            // So if a new transport object is added, 
            // it dosn't need to change codes here
            var cheapestList = [];
            let unique = [...new Set(list.map(i => i.transport))]
            unique.forEach(element => {
                var itemlist = list.filter(item => {
                    if (item.transport === element)
                        return item
                });

                // Find minimum price
                var minItem = itemlist.reduce(function (res, obj) {
                    return (obj.price < res.price) ? obj : res;
                });
                cheapestList.push(minItem);
            });

            return (
                <>
                    {cheapestList.map(item => (
                        <tr key={item.id}>
                            <td>{this.state.date}</td>
                            <td>{item.transport}</td>
                            <td>
                                {item.segments[0].departure}
                                <br />
                                {this.getTime(item.segments[0].fromTime)}
                            </td>
                            <td>
                                {item.segments[0].arrival}
                                <br />
                                {this.getTime(item.segments[0].toTime)}
                            </td>
                            <td>{item.duration}</td>
                            <td>{item.price + " " + this.state.currency}</td>
                        </tr>
                    ))}
                </>
            )
        }
    }
}

export default Users;