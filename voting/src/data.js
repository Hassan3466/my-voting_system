import Thumbnail1 from "./assets/flag1.jpg";
import Thumbnail2 from "./assets/flag2.jpg";
import Thumbnail3 from "./assets/flag3.png";
import Candidates1 from "./assets/Candidate1.jpg";
import Candidates2 from "./assets/candidate2.jpg";
import Candidates3 from "./assets/candidate3.jpg";
import Candidates4 from "./assets/candidate4.jpg";
import Candidates5 from "./assets/candidate5.jpg";
import Candidates6 from "./assets/candidate6.jpg";
import Candidates7 from "./assets/candidate7.jpg";


export const elections = [
    {
        id:"e1",
        title: "Haevard Presidential Elections 2024",
        description: `Provident similique accusantium nen auten. Veritati obcaecati 
        tenetur dure ous earum olestias architecto voluptate allquam nihil, wveniet alleuld culpa officia aut! Impedit sit sunt quserat,
         odit, tenetur error, harum nesciunt ipsum debitis quas debitis aliquid.`,
        thumbnail: Thumbnail1,
        candidates: ["c1", "c2", "c3", "c4"],
        voters: []
    },
    {
        id:"e2",
        title: "Legon SRC Presidential Elections 2024",
        description: `Provident similique accusantium nen auten. Veritati obcaecati 
        tenetur dure ous earum olestias architecto voluptate allquam nihil, wveniet alleuld culpa officia aut! Impedit sit sunt quserat,
         odit, tenetur error, harum nesciunt ipsum debitis quas debitis aliquid.`,
        thumbnail: Thumbnail2,
        candidates: ["c5", "c6", "c7"],
        voters: []
    },
    {
        id:"e3",
        title: "Stanford SRC Presidential Elections 2024",
        description: `Provident similique accusantium nen auten. Veritati obcaecati 
        tenetur dure ous earum olestias architecto voluptate allquam nihil, wveniet alleuld culpa officia aut! Impedit sit sunt quserat,
         odit, tenetur error, harum nesciunt ipsum debitis quas debitis aliquid.`,
        thumbnail: Thumbnail3,
        candidates: [],
        voters: []
    },
]

export const candidates = [
    {
        id: "c1",
        fullName: "Enoch Ganyo",
        image: Candidates1,
        motto: `Sed quibusdaa rocusandao a1ias error haru axim adipisci aet laboru.`,
        voteCount: 23,
        election: "e1",
    },
    {
        id: "c2",
        fullName: "John Asiama",
        image: Candidates2,
        motto: `Sed quibusdaa rocusandao a1ias error haru axim adipisci aet laboru.`,
        voteCount: 18,
        election: "e1",
    },
    {
        id: "c3",
        fullName: "Dora Stephenson",
        image: Candidates3,
        motto: `Sed quibusdaa rocusandao a1ias error haru axim adipisci aet laboru.`,
        voteCount: 3,
        election: "e2",
    },
    {
        id: "c4",
        fullName: "Chairman Wobetumi",
        image: Candidates4,
        motto: `Sed quibusdaa rocusandao a1ias error haru axim adipisci aet laboru.`,
        voteCount: 5,
        election: "e1",
    },
    {
        id: "c5",
        fullName: "Kolapo Ishola",
        image: Candidates5,
        motto: `Sed quibusdaa rocusandao a1ias error haru axim adipisci aet laboru.`,
        voteCount: 238,
        election: "e2",
    },
    {
        id: "c6",
        fullName: "Vivian Jill",
        image: Candidates6,
        motto: `Sed quibusdaa rocusandao a1ias error haru axim adipisci aet laboru.`,
        voteCount: 42,
        election: "e2",
    },
    {
        id: "c7",
        fullName: "Mohammed Bawunia",
        image: Candidates7,
        motto: `Sed quibusdaa rocusandao a1ias error haru axim adipisci aet laboru.`,
        voteCount: 198,
        election: "e2",
    },

]

export const voters = [
    {
        id: "v1",
        fullName: "Hassan Muaz",
        email:"muazhassan02@gmail.com",
        password: "password123",
        isAdmin: true,
        votedElections: ["e2"]
    },
    {
        id: "v2",
        fullName: "Olaniyi Muaz",
        email:"Olaniyi@gmail.com",
        password: "Olaniyi123",
        isAdmin: false,
        votedElections: ["e1", "e2"]
    },
    {
        id: "v3",
        fullName: "Daniel Kolapo",
        email:"Kolapo@gmail.com",
        password: "Kolapo123",
        isAdmin: false,
        votedElections: ["e1", "e2"]
    },
     {
        id: "v4",
        fullName: "Dany Dyche",
        email:"Dany@gmail.com",
        password: "Dany123",
        isAdmin: true,
        votedElections: []
    },
]
