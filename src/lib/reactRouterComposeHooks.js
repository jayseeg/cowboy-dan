// https://github.com/ReactTraining/react-router/issues/3103#issuecomment-215824550
// https://github.com/baronswindle/react-router-compose-hooks/blob/master/index.js

export function composeEnterHooksParallel(...hooks) {
  let callbacksRequired = hooks.reduce((totalCallbacks, hook) => {
    if (hook.length >= 3) totalCallbacks++
    return totalCallbacks
  }, 0)
  return function onEnter(nextState, replace, executeTransition) {
    let callbacksInvoked = 0
    hooks.forEach((hook) => {
      hook.call(this, nextState, replace, () => {
        if (++callbacksInvoked === callbacksRequired) executeTransition()
      })
    })
    if (!callbacksRequired) executeTransition()
  }
}
