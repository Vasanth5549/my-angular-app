interface BaseContextManager {
  Add(key: string, value: any): void;
}
export class base implements BaseContextManager {
  private static _wizardContext: base;
  public objWizardContext: base = base._wizardContext;

 
  constructor(init?: { key: string; value: string }[]) {
    if (init) {
      for (var x = 0; x < init.length; x++) {
        this[init[x].key] = init[x].value;
      }
    }
  }

  public Add(key: string, value: string) {
    this[key] = value;
  }

  public static get WizardContext() {
    if (base._wizardContext == null)
      base._wizardContext = new base();
    if (base._wizardContext.objWizardContext == null)
      base._wizardContext.objWizardContext = base._wizardContext;
    return base._wizardContext;
  }

  public ContainsKey(key: string) {
    if (typeof this[key] === 'undefined') {
      return false;
    }

    return true;
  }

  public GetContext(key: string): Boolean {
    return base._wizardContext.ContainsKey(key);
  }

  public Remove(key: string) {
    if (base._wizardContext.ContainsKey(key)) {
      delete this[key];
    }
  }

}