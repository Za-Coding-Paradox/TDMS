'use client'

import { useState } from 'react'
import { FormField } from '@/components/ui/FormField'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { updateCompanyProfile } from '@/modules/company-profile/actions/update'
import type { CompanyProfile } from '@/modules/company-profile/types'

interface CompanyProfileFormProps {
  profile: CompanyProfile | null
}

type FormState = {
  name: string
  address: string
  country: string
  ntn: string
  bank_name: string
  bank_branch: string
  account_number: string
  bank_address: string
  swift_code: string
  iban: string
  signatory_name: string
  signatory_designation: string
}

function toFormState(profile: CompanyProfile | null): FormState {
  return {
    name:                   profile?.name ?? '',
    address:                profile?.address ?? '',
    country:                profile?.country ?? '',
    ntn:                    profile?.ntn ?? '',
    bank_name:              profile?.bank_name ?? '',
    bank_branch:            profile?.bank_branch ?? '',
    account_number:         profile?.account_number ?? '',
    bank_address:           profile?.bank_address ?? '',
    swift_code:             profile?.swift_code ?? '',
    iban:                   profile?.iban ?? '',
    signatory_name:         profile?.signatory_name ?? '',
    signatory_designation:  profile?.signatory_designation ?? '',
  }
}

function SectionHeading({ title }: { title: string }): React.ReactElement {
  return (
    <h2
      className="text-sm font-semibold uppercase tracking-wider pb-2 mb-4"
      style={{
        color: 'var(--color-text-secondary)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {title}
    </h2>
  )
}

export function CompanyProfileForm({
  profile,
}: CompanyProfileFormProps): React.ReactElement {
  const [form, setForm] = useState<FormState>(toFormState(profile))
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | undefined>()

  function setField(field: keyof FormState) {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      setSuccess(false)
      setError(undefined)
    }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setIsLoading(true)
    setSuccess(false)
    setError(undefined)

    const result = await updateCompanyProfile(form)

    if (!result.success) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-2xl">
      {error && (
        <div
          className="rounded-md px-4 py-3 text-sm"
          style={{ backgroundColor: 'var(--color-error-light)', color: 'var(--color-error)' }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="rounded-md px-4 py-3 text-sm"
          style={{ backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)' }}
        >
          Profile saved successfully.
        </div>
      )}

      {/* Company identity */}
      <div>
        <SectionHeading title="Company Details" />
        <div className="flex flex-col gap-4">
          <FormField label="Company name" id="name" value={form.name}
            onChange={setField('name')} required />
          <FormField label="Address" id="address" value={form.address}
            onChange={setField('address')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Country" id="country" value={form.country}
              onChange={setField('country')} />
            <FormField label="NTN (National Tax Number)" id="ntn" value={form.ntn}
              onChange={setField('ntn')} />
          </div>
        </div>
      </div>

      {/* Bank details */}
      <div>
        <SectionHeading title="Bank Details" />
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Bank name" id="bank_name" value={form.bank_name}
              onChange={setField('bank_name')} />
            <FormField label="Branch" id="bank_branch" value={form.bank_branch}
              onChange={setField('bank_branch')} />
          </div>
          <FormField label="Account number" id="account_number" value={form.account_number}
            onChange={setField('account_number')} />
          <FormField label="Bank address" id="bank_address" value={form.bank_address}
            onChange={setField('bank_address')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="SWIFT code" id="swift_code" value={form.swift_code}
              onChange={setField('swift_code')} />
            <FormField label="IBAN" id="iban" value={form.iban}
              onChange={setField('iban')} />
          </div>
        </div>
      </div>

      {/* Signatory */}
      <div>
        <SectionHeading title="Authorized Signatory" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full name" id="signatory_name" value={form.signatory_name}
            onChange={setField('signatory_name')} />
          <FormField label="Designation" id="signatory_designation"
            value={form.signatory_designation}
            onChange={setField('signatory_designation')} />
        </div>
      </div>

      <div>
        <SubmitButton label="Save profile" loadingLabel="Saving..." isLoading={isLoading} />
      </div>
    </form>
  )
}
