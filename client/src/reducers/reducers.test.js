import lifts from "reducers/lifts";
import selectedLift from "reducers/selectedLift";
import { addLift, editLift, deleteLift, setSelectedLift } from "actions";

describe("lifts reducer", () => {
  it("to return initial state", () => {
    expect(lifts(undefined, {})).toEqual([]);
  });

  it("add a lift", () => {
    expect(
      lifts(
        [], 
        { type: "ADD_LIFT", lift: { id: 0, liftType: "Bench Press" } }
      )
    ).toEqual([{ id: 0, liftType: "Bench Press" }]);

    expect(
      lifts(
        [{ id: 0, liftType: "Bench Press" }],
        { type: "ADD_LIFT", lift: {id: 1, liftType: "Squat" }}
      )
    ).toEqual([
      { id: 0, liftType: "Bench Press" },
      { id: 1, liftType: "Squat" }
    ])
  });

  it("edit a lift", () => {
    expect(
      lifts(
        [{ _id: 0, liftType: "Bench Press" }],
        { type: "EDIT_LIFT", lift: { liftType: "Squat" }, liftId: 0 }
      )
    ).toEqual([{ _id: 0, liftType: "Squat" }])
  });

  it("delete a lift", () => {
    expect(
      lifts(
        [{ _id: 5, liftType: "Bench Press" }],
        { type: "DELETE_LIFT", liftId: 5 }
      )
    ).toEqual([]);

    expect(
      lifts(
        [
          { _id: 6, liftType: "Bench Press" },
          { _id: 5, liftType: "Squat" }
        ],
        { type: "DELETE_LIFT", liftId: 5 }
      )
    ).toEqual([
      { _id: 6, liftType: "Bench Press" }
    ]);
  });
});
