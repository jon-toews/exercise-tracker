import { byId } from "reducers/liftsNormal"

describe("lifts byId reducer", () => {
  
  it("to return initial state", () => {
    expect(byId(undefined, {})).toEqual({})
  })

  it("add a lift", () => {
    expect(
      byId(
        {},
        { type: "ADD_LIFT", lift: { liftType: "Bench Press" }, liftId: "a" }
      )
    ).toEqual({
      a: { _id: "a", liftType: "Bench Press" }
    })

    expect(
      byId(
        {
          a: { _id: "a", liftType: "Bench Press" }
        },
        { type: "ADD_LIFT", lift: { liftType: "Squat" }, liftId: "abcd" }
      )
    ).toEqual({
      a: { _id: "a", liftType: "Bench Press" },
      abcd: { _id: "abcd", liftType: "Squat"}
    })
  })

  it("edit a lift", () => {
    expect(
      byId(
        {
        a: { _id: "a", liftType: "Bench Press" },
        abcd: { _id: "abcd", liftType: "Squat"}
        },
        { type: "EDIT_LIFT", liftId: 'abcd', lift: { liftType: "Bicep Curl" } }
      )
    ).toEqual({
      a: { _id: "a", liftType: "Bench Press" },
      abcd: { _id: "abcd", liftType: "Bicep Curl"}
    })
  })

  it("delete a lift", () => {
    expect(
      byId(
        {
        a: { _id: "a", liftType: "Bench Press" },
        abcd: { _id: "abcd", liftType: "Squat"}
        },
        { type: "DELETE_LIFT", liftId: "a" }
      )
    ).toEqual({
      abcd: { _id: "abcd", liftType: "Squat" },
    })
  })

  it("deleting unknow item does not change state", () => {
    expect(
      byId(
        {
        abcd: { _id: "abcd", liftType: "Squat"}
        },
        { type: "DELETE_LIFT", liftId: "zzzz" }
      )
    ).toEqual(
      {
        abcd: { _id: "abcd", liftType: "Squat"}
      }
    )

  })

})
