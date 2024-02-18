import json

# Load patient data from the JSON file
with open("E:/Welcome/k'hacks/proppoint-server/ai_model/patient_data.json", "r") as json_file:
    patient_data = json.load(json_file)

# Define weights for each priority rule
weights = {
    "age>=60": 5,
    "pregnancy=true": 4,
    "infant=true": 3,
    "1<=age<=10": 2,
    "surgery=true": 1
}

# Function to calculate the priority score for a patient
def calculate_priority_score(patient):
    score = 0

    # Apply weights to each priority rule
    if patient["age"] >= 60:
        score += weights["age>=60"]
    if patient["pregnancy"]:
        score += weights["pregnancy=true"]
    if patient["infant"]:
        score += weights["infant=true"]
    if 1 <= patient["age"] <= 10:
        score += weights["1<=age<=10"]
    if patient["surgery"]:
        score += weights["surgery=true"]

    return score

# Calculate priority scores for each patient
patient_scores = [(patient, calculate_priority_score(patient)) for patient in patient_data]

# Sort patient data based on priority scores
sorted_patient_data = sorted(patient_scores, key=lambda x: x[1], reverse=True)

# Extract sorted patient data without priority scores
sorted_patient_data_without_scores = [patient for patient, _ in sorted_patient_data]

# Print the sorted patient data
print("Sorted Patient Data:")
print(json.dumps(sorted_patient_data_without_scores, indent=2))

# Create a new JSON file with sorted patient data
output_data = []

for index, (patient, _) in enumerate(sorted_patient_data, start=1):
    output_data.append({
        "_id": patient["_id"],
        "sno": index,
        "first name": patient["name"].split(" ")[0],
        "last name": patient["name"].split(" ")[1] if " " in patient["name"] else ""
    })

# Save to a new JSON file
output_filename = "E:/Welcome/k'hacks/proppoint-server/ai_model/storted_patient_data.json"
with open(output_filename, "w") as output_file:
    json.dump(output_data, output_file, indent=2)

print(f"Sorted patient data saved to {output_filename}")
print(json.dumps(output_data, indent=2))