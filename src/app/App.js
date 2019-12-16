import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import Card from '../card/Card'
import GuessCount from '../guess/GuessCount'
import HallOfFame, { FAKE_HOF } from "../hall/HallOfFame";

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends Component {

    state = {
        cards : this.generateCards(),
        currentPair: [],
        guesses: 0,
        matchedCardIndices: [],
    }

    //bind this to fx handleCardClick
    /*constructor(props) {
        super(props);
        this.handleCardClick = this.handleCardClick.bind(this)
    }*/
    generateCards() {
        const result = []
        const size = SIDE * SIDE
        const candidates = shuffle(SYMBOLS)
        while (result.length < size) {
            const card = candidates.pop()
            result.push(card, card)
        }
        return shuffle(result)
    }

    // get feedback for cards
    getFeedbackForCard(index) {
        const { currentPair, matchedCardIndices } = this.state
        const indexMatched = matchedCardIndices.includes(index)

        if (currentPair.length < 2) {
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
        }

        if (currentPair.includes(index)) {
            return indexMatched ? 'justMatched' : 'justMismatched'
        }

        return indexMatched ? 'visible' : 'hidden'
    }
    // Arrow fx for binding
    handleCardClick = index => {
        const { currentPair } = this.state

        if (currentPair.length === 2) {
            return
        }

        if (currentPair.length === 0) {
            this.setState({ currentPair: [index] })
            return
        }

        this.handleNewPairClosedBy(index)
    }

    render() {
        const { cards, guesses, matchedCardIndices } = this.state
        const won = cards.length === matchedCardIndices.length
        return (
            <div className="memory">
                <GuessCount guesses = {guesses}/>

                {cards.map( (card, index) => (
                    <Card
                        key= {index}
                        card={card}
                        feedback= { this.getFeedbackForCard(index)}
                        index = {index}
                        onClick={this.handleCardClick}>
                    </Card>
                ))}
                {won && <HallOfFame entries= {FAKE_HOF} ></HallOfFame> }
            </div>
        )
    }
}

export default App
