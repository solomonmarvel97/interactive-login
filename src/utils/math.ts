/**
 * Utility functions for calculating angles and positions for eye tracking
 */

export interface Point {
  x: number;
  y: number;
}

/**
 * Calculates the position of the pupil based on the mouse position relative to the eye center
 * @param mouseX - Global mouse X position
 * @param mouseY - Global mouse Y position
 * @param eyeX - Global eye X position (center)
 * @param eyeY - Global eye Y position (center)
 * @param radius - Maximum radius the pupil can move
 */
export function calculatePupilPosition(
  mouseX: number,
  mouseY: number,
  eyeX: number,
  eyeY: number,
  radius: number = 3 // Standard movement radius
): { x: number; y: number } {
  // Calculate vector from eye to mouse
  const dx = mouseX - eyeX;
  const dy = mouseY - eyeY;
  
  // Calculate distance
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Calculate angle
  const angle = Math.atan2(dy, dx);
  
  // Limit movement to radius
  const moveDistance = Math.min(distance / 20, radius); // Scaling factor to make movement subtle
  
  return {
    x: Math.cos(angle) * moveDistance,
    y: Math.sin(angle) * moveDistance
  };
}
