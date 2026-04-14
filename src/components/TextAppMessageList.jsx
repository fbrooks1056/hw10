import { useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Message from "./Message";
import Constants from "../constants/Constants";

export default function TextAppMessageList({messages}) {

    const lastItem = useRef();
    const visibleMessages = messages.filter(m => m.role !== Constants.Roles.Developer);

    useEffect(() => {
        lastItem.current?.scrollIntoView({ behavior: 'smooth' })
    }, [visibleMessages])

    return <Container className="message-list">
        {visibleMessages.map((message, i) => <Row
                ref={i === visibleMessages.length - 1 ? lastItem : undefined}
                key={i}
                style={{marginBottom: "0.25rem"}}
            >
                <Message role={message.role} content={message.content}/>
            </Row>
        )}
    </Container>
}