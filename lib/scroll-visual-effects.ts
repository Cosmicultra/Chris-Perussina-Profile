type ScrollVisualEffect = () => void;

const effects = new Set<ScrollVisualEffect>();

export function registerScrollVisualEffect(effect: ScrollVisualEffect) {
  effects.add(effect);
  return () => {
    effects.delete(effect);
  };
}

export function runScrollVisualEffects() {
  effects.forEach((effect) => effect());
}
