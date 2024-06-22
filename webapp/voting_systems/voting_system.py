import logging
from operator import itemgetter

class VotingSystems:
    
    @staticmethod
    def turnIntoDhondtData(data):
        totalSeats = data["total_seats"]
        results = data["results"]
        newResults = []
        for key in results.keys():
            newResults.append((key, results[key], results[key]))
        return newResults

    @staticmethod
    def dhondt(results, seats, total_seats):
        elected_total = 0
        while elected_total < total_seats:
            results = sorted(results, key=itemgetter(1), reverse=True)
            largest_party = results[0]
            if largest_party[0] in seats:
                seats[largest_party[0]] += 1
            else:
                seats[largest_party[0]] = 1
            elected_total += 1
            new_votes = largest_party[2] / (seats[largest_party[0]] + 1)
            results.pop(0)
            results.append((largest_party[0], new_votes, largest_party[2]))
        return seats
    
    @staticmethod
    def sainte_lague(results, seats, total_seats):
        elected_total = 0
        while elected_total < total_seats:
            results = sorted(results, key=itemgetter(1), reverse=True)
            largest_party = results[0]
            if largest_party[0] in seats:
                seats[largest_party[0]] += 1
            else:
                seats[largest_party[0]] = 1
            elected_total += 1
            new_votes = largest_party[2] / ((seats[largest_party[0]] * 2) + 1)
            results.pop(0)
            results.append((largest_party[0], new_votes, largest_party[2]))
        return seats
    
    @staticmethod
    def hare_lr(results, seats, total_seats):
        elected_total = 0
        total_votes = sum([votes[1] for votes in results])
        threshold = total_votes // total_seats
        while elected_total < total_seats:
            results = sorted(results, key=itemgetter(1), reverse=True)
            largest_party = results[0]
            if largest_party[0] in seats:
                seats[largest_party[0]] += 1
            else:
                seats[largest_party[0]] = 1
            elected_total += 1
            new_votes = largest_party[1] - threshold
            results.pop(0)
            results.append((largest_party[0], new_votes, largest_party[2]))
        return seats
    



    @staticmethod
    def party_proportional(results, total_seats):
        seats = {}
        new_result = []
        total = 0
        threshold = sum(results.values()) / total_seats
        print(f"The threshold is {threshold} to gain a seat.")
        for party in results:
            party_seats = int(results[party] // threshold)
            new_vote = results[party] / (party_seats + 1)
            if party_seats > 0:
                seats[party] = party_seats
                total += party_seats
            new_result.append((party, new_vote, results[party]))
        if total < total_seats:
            top_up = total_seats - total
            print(f"There are still {top_up} seats to assign. Using Dhondt for the rest")
            seats = VotingSystems.dhondt(new_result, seats, top_up)
    
        return seats
    
if __name__ == "__main__":
    results = VotingSystems.turnIntoDhondtData({"total_seats": 11, "results": {"Labour": 204011, "Conservatives": 258794, "Liberal Democrats": 33604, "Greens": 10375, "Ash Ind": 13498, "Brexit": 15728, "Others": 9743}})
    print(VotingSystems.hare_lr(results, {}, 11))
    print(VotingSystems.dhondt(results, {}, 11))
    print(VotingSystems.sainte_lague(results, {}, 11))