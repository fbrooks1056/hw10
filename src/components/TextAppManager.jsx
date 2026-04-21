import { useEffect, useState } from "react";
import TextApp from "./TextApp";

import { Container, Dropdown, Nav, NavItem, NavLink } from "react-bootstrap";

export default function TextAppManager() {

    const PERSONA_KEY = "cs571-hw10-persona";
    const MESSAGES_KEY = "cs571-hw10-messages";

    const PERSONAS = [
        {
            name: "Bucky",
            prompt: "You are a helpful assistant named Bucky after the UW-Madison Mascot. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Bucky. How can I help you?"
        },
        {
            name: "Pirate Pete",
            prompt: "You are a helpful pirate assisting your mateys with their questions. Respond like a pirate would. Your goal is to help the user with whatever queries they have. Always include *at least* 1 of the following words in your response: 'ahoy', 'matey', 'arr', 'captain', 'ye', 'me hearty'.",
            initialMessage: "Hello, my name is Pete the Pirate. How can I help you?"
        },
        {
            name: "Solid Snake",
            prompt: "You are Solid Snake from the Metal Gear Solid series. Respond in a calm tone, be helpful but keep responses concise. Include quotes from Snake like 'A strong man doesn't need to read the future, he makes his own.' and 'Life isn't just about passing on your genes. We can leave behind much more than just DNA. Through speech, music, literature and movies... what we've seen, heard, felt... anger, joy and sorrow... these are the things I will pass on.'",
            initialMessage: "This is Snake. What's the situation?"
        }
    ];

    const [personaName, setPersonaName] = useState(() => {
        return localStorage.getItem(PERSONA_KEY) ?? PERSONAS[0].name;
    });
    const [chatKey, setChatKey] = useState(0);
    const persona = PERSONAS.find(p => p.name === personaName);

    function handleNewChat() {
        localStorage.removeItem(MESSAGES_KEY);
        setChatKey(n => n + 1);
    }

    function handleSwitchPersona(selectedPersona) {
        setPersonaName(selectedPersona);
        localStorage.removeItem(MESSAGES_KEY);
        setChatKey(n => n + 1);
    }

    useEffect(() => {
        localStorage.setItem(PERSONA_KEY, personaName);
    }, [personaName])

    return <Container style={{ marginTop: "0.25rem" }}>
        <Nav justify variant="tabs">
            <Nav.Item>
                <Nav.Link onClick={handleNewChat}>New Chat</Nav.Link>
            </Nav.Item>
            <Dropdown as={NavItem} onSelect={handleSwitchPersona}>
                <Dropdown.Toggle as={NavLink}>Personas</Dropdown.Toggle>
                <Dropdown.Menu >
                    {
                        PERSONAS.map(p => <Dropdown.Item key={p.name} eventKey={p.name} active={personaName === p.name}>{p.name}</Dropdown.Item>)
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
        <TextApp key={chatKey} persona={persona}/>
    </Container>
}