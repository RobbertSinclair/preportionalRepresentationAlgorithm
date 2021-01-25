from tkinter import filedialog
from operator import itemgetter
import pyinputplus as pyip
import pandas as pd
import matplotlib.pyplot as plt
import random

def party_proportional(results, total_seats):
    seats = {}
    new_result = []
    total = 0
    threshold = sum(results.values()) // total_seats
    print(f"Threshold: {threshold}")
    for party in results:
        party_seats = results[party] // threshold
        new_vote = results[party] // (party_seats + 1)
        if party_seats > 0:
            seats[party] = party_seats
            total += party_seats
        new_result.append((party, new_vote, results[party]))
    if total < total_seats:
        top_up = total_seats - total
        seats = dhondt(new_result, seats, top_up)
 
    return seats

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
        new_votes = largest_party[2] // (largest_party[1] + 1)
        results.pop(0)
        results.append((largest_party[0], new_votes, largest_party[2]))
    return seats

def input_results():
    end = "y"
    result = {}
    while end == "y":
        print("Please enter party: ")
        party = input(">")
        while True:
            try:
                print("Please enter the number of votes")
                votes = int(input(">"))
                assert votes >= 0
                break
            except AssertionError:
                print("Votes must be greater than or equal to 0")
            except ValueError:
                print("Votes must be an integer")
            except:
                print("An unexpected error has occured")
        
        result[party] = votes
        end = input("Would you like to add another party (y/n)").lower()
    return result

def calculate_others(result, total_votes, percentage=5):
    others = {party: result[party] for party in result if (result[party] / total_votes) * 100 < percentage}
    other_value = sum(others.values())
    for key in others.keys():
        result.pop(key, None)
    if other_value > 0:
        result["others"] = other_value
    return result
    
def read_file():
    print("Please be aware that you must have two columns named 'Party' and 'Votes'")
    result = {}
    file = filedialog.askopenfilename(initialdir="/Documents", title="Select File", filetypes=(("xlsx Files", "*.xlsx"),("csv Files", "*.csv")))
    print(file)
    try:
        data = pd.read_excel(file)
        data = pd.DataFrame(data)
        try:
            party_list = data["Party"].tolist()
            votes_list = data["Votes"].tolist()
        except:
            print("Couldn't find 'Party' or 'Votes' Please ensure that you have these values in the spreadsheet")
            return None
    except:
       print("I couldn't load the file")
       return None
    for i in range(len(party_list)):
        result[party_list[i]] = votes_list[i]
    return result
    
print("Welcome to the party representation calculator")
while True:
    try:
        print("Please enter the total number of seats in your parliament")
        seats = int(input(">"))
        assert seats > 0
        break
    except AssertionError:
        print("Seats must be greater than 0")
    except:
        print("Seats must be an integer")
file = "no"
print("Would you like to enter an xlsx file or manually type your results (Y/N): ")
file = pyip.inputYesNo()
if file == "yes":
    result = read_file()
else:
    result = input_results()
if result != None:
    fig1, ax1 = plt.subplots()
    fig2, ax2 = plt.subplots()
    
    parliament = party_proportional(result, seats)
    result_plt = calculate_others(result.copy(), sum(result.values()))
    ax1.pie(result_plt.values(), labels=result_plt.keys(), shadow=True, autopct="%1.1f%%", startangle=90, radius=3)
    parliament_plt = calculate_others(parliament.copy(), seats)
    ax2.pie(parliament_plt.values(), labels=parliament_plt.keys(), autopct="%1.1f%%", shadow=True, startangle=90, radius=3)
    print("Here is the parliament\n")
    ax1.axis("equal")
    ax2.axis("equal")
    for party in parliament:
        print(f"{party}: {parliament[party]}")
    plt.show()
else:
    print("No result could be calculated")

