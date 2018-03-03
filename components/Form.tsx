import * as React from 'react'

export type FormObject = {
  [key: string]: string | string[] | number | boolean | File
}

export interface Props<T> {
  onSubmit(data: Partial<T>, event?: React.FormEvent<HTMLFormElement>): any
}

export default class Form<
  T extends FormObject = FormObject
> extends React.Component<Props<T>> {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {} as T
    for (const key of formData.keys()) {
      const input = form.elements.namedItem(key)
      if (input instanceof HTMLInputElement) {
        if (input.type === 'checkbox') {
          // handle single checkbox without a value
          data[key] = input.value === 'on'
        } else {
          data[key] = input.value
        }
      } else if (input instanceof NodeList) {
        input.forEach(node => {
          if (node instanceof HTMLInputElement) {
            if (node.type === 'checkbox') {
              // handle hidden input for a checkbox unchecked value
              data[key] = node.checked && node.value === 'on'
            }
          }
        })
      }
    }

    this.props.onSubmit(data, event)
  }

  render() {
    const { children } = this.props
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        {children}
      </form>
    )
  }
}
