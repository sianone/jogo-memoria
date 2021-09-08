import React from "react";


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            faceUp: false,
        };
    }

    flip(){
        this.setState({faceup: !this.state.faceUp})
    }

    render (){
        let content;
        if (this.state.faceUp) {
            content = 'hello'
        } else {
            content- 'Back'
        }

        return (
            <div className="card"
            onClick={this.flip.bind(this)}>
                Testeeeee
            </div>
        )
    }
}

export default Card;