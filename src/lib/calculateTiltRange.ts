function degToRad(d: number) {
  return (d * Math.PI) / 180;
}

function computeAD(AB: number, alphaDeg: number, thetaDeg: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const alpha = toRad(alphaDeg);
  const theta = toRad(thetaDeg);

  // Step 1: AC and CB from right triangle (AC = AB cos α, CB = AB sin α)
  const AC = AB * Math.cos(alpha);
  const CB = AB * Math.sin(alpha);

  // Step 2: quadratic coefficients for d (y-coordinate of D)
  const cos2 = Math.cos(theta) ** 2;

  const a = AB * AB * cos2 - CB * CB;
  const b = 2 * AB * AB * CB * (1 - cos2);
  const c = AB ** 4 * (cos2 - 1);

  // Step 3: discriminant
  const disc = b * b - 4 * a * c;
  if (disc < 0) throw new Error("No real solution!");

  const sqrtDisc = Math.sqrt(disc);

  // Step 4: roots
  const d1 = (-b + sqrtDisc) / (2 * a);
  const d2 = (-b - sqrtDisc) / (2 * a);

  // Step 5: choose valid root (must lie on BC: 0 <= d <= CB)
  let d;
  if (
    d1 >= 0
    //  && d1 <= CB
  )
    d = d1;
  else if (
    d2 >= 0
    //  && d2 <= CB
  )
    d = d2;
  else throw new Error("No valid D on BC!");

  // Step 6: compute AD
  const AD = Math.sqrt(AC * AC + (d - CB) ** 2);

  return { AD, AC, CB, d };
}

export function computeRingAfterTiltTopRay(
  h: number, // camera height
  hFovDeg: number,
  tiltDeg: number, // tilt angle of optical axis
  vFovDeg: number, // vertical FOV of camera
  innerOrig: number, // original inner distance (no tilt)
  outerOrig: number // original outer distance (no tilt)
) {
  const halfV = vFovDeg / 2;

  // Top and bottom ray angles relative to horizontal
  const thetaTop = tiltDeg - halfV;
  const thetaTopReversed = thetaTop * -1;
  let withdrawalAngleTop = ((90 - hFovDeg / 2) * thetaTopReversed) / 90;

  if (thetaTop > 0) {
    withdrawalAngleTop = ((90 - hFovDeg / 2) * thetaTop) / 90;
  }
  const innerOuterTop =
    thetaTop > 0
      ? computeAD(outerOrig, 90 - hFovDeg / 2, withdrawalAngleTop).AD
      : computeAD(outerOrig, 90 - hFovDeg / 2, withdrawalAngleTop).AD;

  const dTop = h / Math.sin(degToRad(thetaTop));

  const newOuterTop =
    thetaTop > 0
      ? Math.min(dTop, outerOrig, innerOuterTop)
      : computeAD(outerOrig, 90 - hFovDeg / 2, withdrawalAngleTop).AD;
  // Ground intersection distances

  // Effective visible band (clamped to original)
  let newInnerTop = innerOrig;
  if (thetaTop > 0 && newInnerTop > 0) {
    newInnerTop = computeAD(
      newInnerTop,
      90 - hFovDeg / 2,
      withdrawalAngleTop
    ).AD;
  } else if (thetaTop < 0 && newInnerTop > 0) {
    newInnerTop = computeAD(
      newInnerTop,
      90 - hFovDeg / 2,
      withdrawalAngleTop
    ).AD;
  }

  // If outer < inner → ring disappears
  if (newOuterTop < newInnerTop) {
    return {
      innerTop:
        thetaTop > 0
          ? Math.min(
              dTop,
              innerOrig,
              computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleTop).AD
            )
          : computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleTop).AD,
      outerTop:
        thetaTop > 0
          ? Math.min(
              dTop,
              innerOrig,
              computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleTop).AD
            )
          : computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleTop).AD,
      visible: false,
      withdrawalAngleTop,
    };
  }

  return {
    innerTop: newInnerTop,
    outerTop: newOuterTop,
    visible: true,
    withdrawalAngleTop,
  };
}

export function computeRingAfterTiltBotRay(
  h: number, // camera height
  hFovDeg: number,
  tiltDeg: number, // tilt angle of optical axis
  vFovDeg: number, // vertical FOV of camera
  innerOrig: number, // original inner distance (no tilt)
  outerOrig: number // original outer distance (no tilt)
) {
  const halfV = vFovDeg / 2;

  // Top and bottom ray angles relative to horizontal

  const thetaBot = tiltDeg + halfV;
  const thetaBotReversed = 180 - (tiltDeg - (180 - halfV));

  let withdrawalAngleBot = ((90 - hFovDeg / 2) * thetaBot) / 90;

  if (thetaBot > 180) {
    withdrawalAngleBot = ((90 - hFovDeg / 2) * thetaBotReversed) / 90;
  }

  const innerOuterBot =
    thetaBot < 180
      ? computeAD(outerOrig, 90 - hFovDeg / 2, withdrawalAngleBot).AD
      : computeAD(outerOrig, 90 - hFovDeg / 2, withdrawalAngleBot).AD;

  const dBot = h / Math.sin(degToRad(thetaBot));

  const newOuterBot =
    thetaBot < 180
      ? Math.min(dBot, outerOrig, innerOuterBot)
      : computeAD(outerOrig, 90 - hFovDeg / 2, withdrawalAngleBot).AD;
  // Ground intersection distances

  // Effective visible band (clamped to original)

  let newInnerBot = innerOrig;
  if (thetaBot < 180 && newInnerBot > 0) {
    newInnerBot = computeAD(
      newInnerBot,
      90 - hFovDeg / 2,
      withdrawalAngleBot
    ).AD;
  } else if (thetaBot > 180 && newInnerBot > 0) {
    newInnerBot = computeAD(
      newInnerBot,
      90 - hFovDeg / 2,
      withdrawalAngleBot
    ).AD;
  }

  // If outer < inner → ring disappears

  if (newOuterBot < newInnerBot) {
    return {
      innerBot:
        thetaBot < 180
          ? Math.min(
              dBot,
              innerOrig,
              computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleBot).AD
            )
          : computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleBot).AD,
      outerBot:
        thetaBot < 180
          ? Math.min(
              dBot,
              innerOrig,
              computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleBot).AD
            )
          : computeAD(innerOrig, 90 - hFovDeg / 2, withdrawalAngleBot).AD,
      visible: false,
      withdrawalAngleBot,
    };
  }

  // console.log(
  //   // "inner and outer insdei teh func",
  //   // newInnerTop,
  //   // newOuterTop,
  //   // "innerOuter",
  //   // innerOuterTop,
  //   // "Math.min(dTop, outerOrig, innerOuter)",
  //   // Math.min(dTop, outerOrig, innerOuterTop),
  //   // "withdrawalAngle",
  //   // withdrawalAngleTop,
  //   "thetaTop",
  //   thetaTop,
  //   "thetaBot",
  //   thetaBot,
  //   "withdrawalAngleBot",
  //   withdrawalAngleBot,
  //   "thetaBotReversed",
  //   thetaBotReversed
  // );

  return {
    innerBot: newInnerBot,
    outerBot: newOuterBot,
    visible: true,
    withdrawalAngleBot,
  };
}
