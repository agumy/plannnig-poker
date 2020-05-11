// import * as React from 'react'

// const Form = () => {
//     const [name, setName] = React.useState('')
//     const [room, setRoom] = React.useState('')

//     const joinRoom = React.useCallback(() => {
//       client.emit('join-room', { name, room })
//     }, [name, room])

//     return (
//       <Row gutter={[16, 16]}>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault()
//             joinRoom()
//           }}
//         >
//           <Col span={8}>
//             <input
//               type="text"
//               name="your-name"
//               placeholder="your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Col>

//           <Col span={8}>
//             <input
//               type="text"
//               name="room-name"
//               placeholder="room name"
//               value={room}
//               onChange={(e) => setRoom(e.target.value)}
//             />
//           </Col>
//           <Col span={8}>
//             <button type="submit">Join the room</button>
//           </Col>
//         </form>
//       </Row>
//     )
