'use client'

import { useEffect, useState } from "react";
import PartyInput from "@/components/partyInput";
import { VoteInput } from "@/definitions/party";
import PartyInputForm from "@/components/partyInputForm";

export default function Home() {
  const [parties, setParties] = useState<Array<VoteInput>>([]);
  const [addParty, setAddParty] = useState<Boolean>(false);

  const cancel = () => {
    setAddParty(false);
  };

  const clickAddNewParty = () => {
    setAddParty(true);
  };

  const deleteParty = (index) => {
    console.log(`Delete party called at ${index}`);
    let newParties = parties;
    newParties = newParties.splice(index, 1);
    setParties(newParties);
  };

  const editParty = () => {

  };

  const submitParty = (party: String, voteShare: Number) => {
    const newParty: VoteInput = {partyName: party, votes: voteShare};
    let newParties: Array<VoteInput> = parties;
    newParties.push(newParty);
    setParties(newParties);
    setAddParty(false);
  };

  const partyInput = parties.map((party, index) => <PartyInput partyName={party.partyName} votes={party.votes} index={index} delete={deleteParty} edit={editParty}/>);

  return (
    <div>
      <h1 className="p-10 text-6xl">Preportional Representation Calculator</h1>
      <div className="flex flex-row flex-wrap">
        <div className="flew-none justify-center">
            <h1 className="p-5 text-4xl text-center">Input</h1>
            <table className="py-4 px-10 table-auto border-collapse border-spacing-7">
            <tbody>
              <tr>
                <th><h1 className="text-3xl">Party</h1></th>
                <th className={"px-4"}><h1 className="text-3xl">Votes</h1></th>
                <th><h1 className="text-3xl">Options</h1></th>
              </tr>
              {parties.map((party, index) => 
                <PartyInput partyName={party.partyName} votes={party.votes} index={index} delete={deleteParty} edit={editParty}/>)
              }
              {addParty && <PartyInputForm submit={submitParty} theInput={{partyName: "", votes: 1}}/>}
            </tbody>
          </table>
          <div className="justify-center text-center">
            {addParty ?<button className="btn btn-red" onClick={cancel}>Cancel</button>  
            : <button className="btn btn-blue" onClick={clickAddNewParty}>Add New Party</button>}
            {!addParty && <button className="btn btn-blue">Submit Results</button>}
          </div>
          
        </div>
        <div className="flex-auto justify-center text-center">
          <h1 className="p-5 text-4xl">Results</h1>
        </div>
      </div>
      
      
    </div>
    

    
    
  );
}
