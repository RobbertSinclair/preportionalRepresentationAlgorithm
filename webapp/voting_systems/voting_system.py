import logging
from operator import itemgetter

class VotingSystems:
    
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
    
