{if $alert}
    <div class="row-fluid">  
        <div class="alert {$alert_type} alert-block span4 offset4">
            <button type="button" class="close">x</button>
        {if $alert_title}<h4>{$alert_title}</h4>{/if}
            {$alert}
        </div> 
    </div>
{/if}